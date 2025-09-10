import type { Plugin } from "vite";
import fs from "fs/promises";
import path from "path";

interface Article {
	title: string;
	route: string;
	id: string;
	ogp?: string;
	parentId: string[];
	genres: string[];
}

interface ArticleMap {
	articles: Article[];
}

export function cleanMapPlugin(): Plugin {
	return {
		name: "vite-plugin-clean-map",
		apply: "build",
		enforce: "post", // OGPプラグインの後に実行
		async closeBundle() {
			try {
				// dist/map.jsonを読み込む
				const mapPath = path.resolve("dist", "map.json");
				const mapContent = await fs.readFile(mapPath, "utf-8");
				const data = JSON.parse(mapContent) as ArticleMap;

				// 各記事からogpフィールドを削除
				const cleanedArticles = data.articles.map((d) => {
					delete d.ogp;
					return d;
				});

				// 新しいmap.jsonを書き出し
				await fs.writeFile(
					mapPath,
					JSON.stringify({ articles: cleanedArticles })
				);

				console.log("Cleaned map.json generated successfully");
			} catch (error) {
				console.error("Error cleaning map.json:", error);
			}
		},
	};
}
