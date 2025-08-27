import { useSearchParams, Navigate, useLocation } from "react-router-dom";
import { articles } from "../../public/data";
import { ArticleContent } from "@/components/ArticleContent";
import type { Article } from "@/types/article";

export default function Article() {
	const [searchParams] = useSearchParams();
	const location = useLocation();
	const id = searchParams.get("p");

	const baseArticle = id ? articles.find((a) => a.id === id) : articles.find((a) => a.route === decodeURIComponent(location.pathname));

	// 記事が見つからない場合は404へ
	if (!baseArticle) {
		return <Navigate to="/404" replace />;
	}
	const article: Article = articles.find((a) => a.id === baseArticle.id) as Article;

	return (
		<div className="max-w-4xl mx-auto">
			<ArticleContent article={article} />
		</div>
	);
}
