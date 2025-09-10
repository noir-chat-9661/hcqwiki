import type { Plugin } from "vite";
import fs from "fs/promises";
import path from "path";

interface Article {
	title: string;
	route: string;
	id: string;
	ogp?: string;
}

interface ArticleMap {
	articles: Article[];
}

const BASE_URL = "https://hcqwiki.pjeita.top";
const DEFAULT_TITLE = "HIMACHATQUEST Wiki";
const DEFAULT_DESCRIPTION = "HIMACHATQUESTの非公式攻略Wiki";
const DEFAULT_IMAGE = `${BASE_URL}/logo.png`;

// 改行をOGP用にエスケープする
function escapeDescription(desc: string): string {
	return desc.replace(/\n/g, "&#10;");
}

export function ogpPlugin(): Plugin {
	return {
		name: "vite-plugin-ogp",
		apply: "build",
		async transformIndexHtml(html: string) {
			try {
				// OGPタグの生成（デフォルトの説明文に改行を含める）
				const ogpTags = `
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${DEFAULT_TITLE}" />
    <meta property="og:description" content="${escapeDescription(
		DEFAULT_DESCRIPTION
	)}" />
    <meta property="og:image" content="${DEFAULT_IMAGE}" />
    <meta property="og:url" content="${BASE_URL}" />
    <meta name="twitter:card" content="summary" />`;

				// headタグの直前にOGPタグを挿入
				return html.replace("</head>", `${ogpTags}\n</head>`);
			} catch (error) {
				console.error("Error generating OGP tags:", error);
				return html;
			}
		},
		async closeBundle() {
			try {
				// map.jsonを読み込む
				const mapContent = await fs.readFile(
					"public/map.json",
					"utf-8"
				);
				const { articles } = JSON.parse(mapContent) as ArticleMap;

				// 各記事用のHTMLを生成
				for (const article of articles) {
					const htmlContent = `<!DOCTYPE html>
<html lang="ja">
<head prefix="og: https://ogp.me/ns# fb: https://ogp.me/ns/fb# article: https://ogp.me/ns/article#">
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${article.title} - ${DEFAULT_TITLE}</title>
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${article.title} - ${DEFAULT_TITLE}" />
    <meta property="og:description" content="${escapeDescription(
		article.ogp ?? DEFAULT_DESCRIPTION
	)}" />
    <meta property="og:image" content="${DEFAULT_IMAGE}" />
    <meta property="og:url" content="${BASE_URL}${article.route}" />
    <meta name="twitter:card" content="summary" />
    <script type="text/javascript">
      (function () {
        window.localStorage.setItem("spa_path", "${article.route}");
        window.location.href = "/";
      })();
    </script>
</head>
<body>
    読み込み中...
</body>
</html>`;

					// 記事用のディレクトリを作成
					const dirPath = path.join(
						"dist",
						article.route.substring(1)
					);
					await fs.mkdir(dirPath, { recursive: true });

					// index.htmlを生成
					await fs.writeFile(
						path.join(dirPath, "index.html"),
						htmlContent
					);
				}

				console.log("OGP pages generated successfully");
			} catch (error) {
				console.error("Error generating OGP pages:", error);
			}
		},
	};
}
