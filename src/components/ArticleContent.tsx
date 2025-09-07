import ReactMarkdown from "react-markdown";
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { Article, ArticleMap } from "@/types/article";
import rehypeRaw from "rehype-raw";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadArticleContent, loadArticleIndex } from "@/lib/utils";

interface ArticleContentProps {
	article: Article;
}

export function ArticleContent({ article: baseArticle }: ArticleContentProps) {
	const [article, setArticle] = useState(baseArticle);
	const [articles, setArticles] = useState<ArticleMap[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function loadContent() {
			try {
				setIsLoading(true);
				setError(null);
				const [fullArticle, articleIndex] = await Promise.all([
					loadArticleContent(baseArticle.id),
					loadArticleIndex(),
				]);
				setArticle(fullArticle);
				setArticles(articleIndex);
			} catch (e) {
				setError(
					e instanceof Error
						? e.message
						: "記事の読み込みに失敗しました"
				);
			} finally {
				setIsLoading(false);
			}
		}

		loadContent();
	}, [baseArticle.id]);

	if (error) {
		return (
			<div className="text-red-500">
				<p>エラーが発生しました：</p>
				<p>{error}</p>
			</div>
		);
	}

	if (isLoading) {
		return <div>読み込み中...</div>;
	}

	return (
		<article className="prose prose-invert max-w-none">
			<Breadcrumb className="mb-4">
				<BreadcrumbList>
					<BreadcrumbItem>
						<Link to="/">ホーム</Link>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					{article.parentId?.length != 0 &&
						article.parentId.map((pid) => (
							<>
								<BreadcrumbItem>
									<Link to={`/?p=${pid}`}>
										{articles.find((a) => a.id === pid)
											?.title || "親記事"}
									</Link>
								</BreadcrumbItem>
								<BreadcrumbSeparator />
							</>
						))}
					<BreadcrumbItem>
						<span>{article.title}</span>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<h1 className="text-4xl font-bold mb-4">{article.title}</h1>
			{article.genres && article.genres.length > 0 && (
				<div className="flex gap-2 mb-4">
					{article.genres.map((genre) => {
						const matchingArticle = articles.find(
							(a) => a.title === genre
						);
						return (
							<span
								key={genre}
								className={`px-2 py-1 bg-primary/10 rounded-md text-sm ${
									matchingArticle
										? "hover:bg-primary/20 cursor-pointer"
										: ""
								}`}
							>
								{matchingArticle ? (
									<Link
										to={matchingArticle.route}
										className="hover:text-primary"
									>
										{genre}
									</Link>
								) : (
									genre
								)}
							</span>
						);
					})}
				</div>
			)}
			<ReactMarkdown
				rehypePlugins={[rehypeRaw]}
				components={{
					h1: ({ children }) => (
						<h1 className="text-3xl font-bold mt-8 mb-4 text-primary">
							{children}
						</h1>
					),
					h2: ({ children }) => (
						<h2 className="text-2xl font-bold mt-8 mb-3 text-primary">
							<span className="bg-blue-200/80 px-3 py-1 rounded-lg">
								{children}
							</span>
						</h2>
					),
					h3: ({ children }) => (
						<h3 className="text-xl font-bold mt-5 mb-2 text-primary">
							<span className="bg-blue-100/80 px-3 py-1 rounded-lg">
								{children}
							</span>
						</h3>
					),
					iframe: (props) => (
						<div className="my-4 w-full md:w-[560px] mx-auto">
							<iframe
								{...props}
								allowFullScreen
								className="aspect-video w-full h-full rounded-lg border border-gray-300"
							/>
						</div>
					),
					p: ({ children }) => <p className="my-2">{children}</p>,
					ul: ({ children }) => (
						<ul className="list-disc my-2 ml-6">{children}</ul>
					),
					ol: ({ children }) => (
						<ol className="list-decimal my-2 ml-6">{children}</ol>
					),
					li: ({ children }) => <li className="my-1">{children}</li>,
					a: ({ children, href }) => (
						<Link
							to={href || ""}
							className="text-primary hover:underline"
						>
							{children}
						</Link>
					),
				}}
			>
				{article.content.replaceAll("\t", "")}
			</ReactMarkdown>
		</article>
	);
}
