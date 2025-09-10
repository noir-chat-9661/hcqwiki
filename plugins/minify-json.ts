import type { Plugin } from "vite";
import fs from "fs/promises";
import glob from "fast-glob";

export function minifyJsonPlugin(): Plugin {
	return {
		name: "vite-plugin-minify-json",
		apply: "build",
		async closeBundle() {
			try {
				// distディレクトリ内のすべてのJSONファイルを取得
				const files = await glob("dist/data/*.json");

				for (const file of files) {
					const content = await fs.readFile(file, "utf-8");
					const data = JSON.parse(content);

					// インデントなしでJSON文字列化
					await fs.writeFile(file, JSON.stringify(data));
				}

				console.log("JSON files minified successfully");
			} catch (error) {
				console.error("Error minifying JSON files:", error);
			}
		},
	};
}
