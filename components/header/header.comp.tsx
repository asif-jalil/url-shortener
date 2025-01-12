import { FaGithub } from 'react-icons/fa';

import Link from 'next/link';

const Header = () => (
	<header className="relative mx-5 mt-5 rounded-2xl border h-96 bg-slate-50">
		<div className="relative flex items-center justify-center h-full">
			<div className="max-w-5xl mx-auto text-center px-5 space-y-5">
				<h1 className="lg:text-6xl text-5xl">URL Shortener</h1>
				<p className="max-w-lg text-slate-500 text-sm lg:text-base">
					Generate a temporary short URL for your long links and share them easily.
				</p>
				<Link
					href="https://github.com/asif-jalil/placeholder-image-maker"
					target="_blank"
					className="inline-flex gap-2 items-center px-5 py-1.5 border rounded-xl hover:bg-slate-100"
				>
					<FaGithub /> <span className="text-sm font-medium">Github</span>
				</Link>
			</div>
		</div>
	</header>
);

export default Header;
