import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Article, ArticleMap } from "@/types/article";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function loadArticleContent(id: string): Promise<Article> {
	const response = await fetch(`/data/${id}.json`);
	if (!response.ok) {
		throw new Error("記事の読み込みに失敗しました");
	}
	return response.json();
}

let articlesCache: ArticleMap[] | null = null;

export async function loadArticleIndex(): Promise<ArticleMap[]> {
	if (articlesCache !== null) {
		return articlesCache;
	}

	const response = await fetch("/map.json");
	if (!response.ok) {
		throw new Error("記事一覧の読み込みに失敗しました");
	}

	const data: { articles: ArticleMap[] } = await response.json();
	articlesCache = data.articles;
	return data.articles;
}

// キャッシュをクリアする（必要な場合）
export function clearArticleCache() {
	articlesCache = null;
}
