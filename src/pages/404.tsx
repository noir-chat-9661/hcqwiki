import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
			<h1 className="text-4xl font-bold mb-4">404</h1>
			<p className="text-xl mb-6">ページが見つかりませんでした</p>
			<Link to="/" className="text-primary hover:underline">
				トップページに戻る
			</Link>
		</div>
	);
}
