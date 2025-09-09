import { Link } from "react-router-dom";

export default function Home() {
	return (
		<div className="space-y-6 text-center text-lg">
			<img src="/logo.png" alt="HIMACHATQUEST Wiki" className="mx-auto w-3/5 select-none touch-none pointer-events-none" />
			当wikiは非公式となります。つきましては、以下の注意事項をよくお読みになってから閲覧されることを強く推奨いたします。
			<article className="prose prose-invert">
				<h2 className="text-2xl font-bold my-3">注意事項</h2>
				<ul className="list-disc list-inside text-left mx-auto w-2/3">
					<li>
						このwikiは非公式です。記載されているデータなどに誤りがある場合が有り、情報の妥当性や正確性について保証するものではなく、一切の責任を負いかねます。
					</li>
					<li>
						当wikiを利用するに当たって発生した損害はいかなる場合でも当サイトでは補償致しません。
					</li>
					<li>
						ご利用につきましては自己責任となりますのでご注意ください。
					</li>
					<li>
						当wikiで使用している画像、情報等の権利、著作権は<Link className="hover:underline" to="https://himaquest.com">HIMACHATQUEST</Link>に帰属します。
					</li>
					<li>
						当wikiおよびwiki管理人はマグナム中野とは一切関係がありません。当wikiの情報をマグナム中野に問い合わせたりしないでください。
					</li>
				</ul>
				<h2 className="text-2xl font-bold my-4">記事</h2>
				<ul className="list-disc list-inside text-center mx-auto w-2/3">
				<li><Link to="/周回キャラ" className="text-primary hover:underline">周回キャラ一覧</Link></li>
				<li><Link to="/緊急クエスト" className="text-primary hover:underline">緊急クエスト一覧</Link></li>
				</ul>
			</article>
		</div>
	);
}
