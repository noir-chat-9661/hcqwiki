import { useSearchParams, Navigate, useLocation } from "react-router-dom";
import { ArticleContent } from "@/components/ArticleContent";
import type { Article, ArticleMap } from "@/types/article";
import { useEffect, useState } from "react";
import { loadArticleIndex } from "@/lib/utils";

export default function Article() {
	const [searchParams] = useSearchParams();
	const location = useLocation();
	const id = searchParams.get("p");
	const [articles, setArticles] = useState<ArticleMap[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		loadArticleIndex()
			.then(setArticles)
			.finally(() => setIsLoading(false));
	}, []);

	if (isLoading) {
		return <div>読み込み中...</div>;
	}

	const baseArticle = id
		? articles.find((a) => a.id === id)
		: articles.find(
				(a) => a.route === decodeURIComponent(location.pathname)
		  );

	// 記事が見つからない場合は404へ
	if (!baseArticle) {
		return <Navigate to="/404" replace />;
	}

	// ArticleMapにcontentを追加してArticle型にする
	const fullArticle: Article = {
		...baseArticle,
		content: "", // 空文字列を初期値として設定（実際のcontentはArticleContentで読み込む）
	};

	return (
		<div className="max-w-4xl mx-auto">
			<ArticleContent article={fullArticle} />
		</div>
	);
}
