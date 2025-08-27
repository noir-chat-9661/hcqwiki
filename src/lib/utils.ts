import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Article } from "@/types/article";

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
