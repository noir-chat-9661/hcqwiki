import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/home";
import Article from "@/pages/article";
import NotFound from "@/pages/404";
import { useSearchParams } from "react-router-dom";
import { articles } from "../public/data";

function Root() {
	const [searchParams] = useSearchParams();
	const id = searchParams.get("p");

	// idが指定されていて、該当記事が存在する場合は記事を表示
	if (id && articles.find((a) => a.id === id)) {
		return <Article />;
	}

	// それ以外はホーム画面
	return <Home />;
}

function App() {
	return (
		<Router>
			<div className="min-h-screen bg-cyan-50">
				<main className="container mx-auto p-4">
					<Routes>
						<Route path="/" element={<Root />} />
						<Route path="/404" element={<NotFound />} />
						<Route path="/*" element={<Article />} />
					</Routes>
				</main>
			</div>
		</Router>
	);
}

export default App;
