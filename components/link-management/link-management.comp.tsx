'use client';

import { useEffect, useState } from 'react';
import { Link } from '../short-link/short-link.types';
import { ErrorResponse, SuccessResponse } from '@/types/network';
import Skeleton from '../skeleton/skeleton.comp';
import ShortLink from '../short-link/short-link.comp';
import TextInput from '../input/text-input.comp';
import Button from '../button/button.comp';

interface LinksResponse {
	links: Link[];
}

interface LinkErrorResponse {
	link: string;
}

const LinkManagement = () => {
	const [link, setLink] = useState('');
	const [links, setLinks] = useState<Link[] | []>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState({ link: '' });

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setLoading(true);

		fetch('/api/links', {
			method: 'POST',
			body: JSON.stringify({ link }),
		})
			.then((res) => res.json())
			.then((data: SuccessResponse<Link> | ErrorResponse<LinkErrorResponse>) => {
				if (data.success) {
					setLinks((prev) => [data.data, ...prev]);
				} else {
					setError(data.errors);
				}

				setLoading(false);
			});
	};

	useEffect(() => {
		setLoading(true);
		fetch('/api/links')
			.then((res) => res.json())
			.then((data: SuccessResponse<LinksResponse>) => {
				setLinks(data.data.links);
				setLoading(false);
			});
	}, []);

	return (
		<>
			<form onSubmit={handleSubmit} className="px-2">
				<TextInput
					label="URL"
					value={link}
					onChange={(e) => setLink(e.target.value)}
					placeholder="https://example.com"
					name="url"
					id="url"
					error={error.link}
				/>
				<div className="mt-8">
					<Button type="submit">Shorten URL</Button>
				</div>
			</form>
			<div className="bg-dark overflow-hidden rounded-3xl">
				<div className="p-3 h-auto rounded-2xl space-y-3">
					<div className="flex gap-5 flex-wrap justify-between items-center w-full">
						<h4 className="ml-3 text-white font-bold">Shorten URLs</h4>
					</div>
				</div>
				<div className="relative w-full border bg-white rounded-t-2xl rounded-b-3xl overflow-y-auto no-scrollbar min-h-28 max-h-96">
					{loading ? (
						<div className="p-5">
							<Skeleton count={4} />
						</div>
					) : (
						links.map((link) => <ShortLink key={link.id} link={link} />)
					)}
				</div>
			</div>
		</>
	);
};

export default LinkManagement;
