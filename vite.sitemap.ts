import type { Plugin } from 'vite';
import fs from 'fs/promises';
import path from 'path';

interface Article {
  title: string;
  route: string;
  id: string;
}

interface ArticleMap {
  articles: Article[];
}

const BASE_URL = 'https://hcqwiki.com';

export function sitemapPlugin(): Plugin {
  return {
    name: 'vite-plugin-sitemap',
    apply: 'build',
    async closeBundle() {
      try {
        // map.jsonを読み込む
        const mapContent = await fs.readFile('public/map.json', 'utf-8');
        const { articles } = JSON.parse(mapContent) as ArticleMap;

        // sitemap.xmlを生成
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}/</loc>
    <priority>1.0</priority>
  </url>
${articles.map(article => `  <url>
    <loc>${BASE_URL}${article.route}</loc>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

        // distディレクトリに保存
        await fs.writeFile(path.resolve('dist', 'sitemap.xml'), sitemap);
        console.log('Sitemap generated successfully');
      } catch (error) {
        console.error('Error generating sitemap:', error);
      }
    }
  };
}
