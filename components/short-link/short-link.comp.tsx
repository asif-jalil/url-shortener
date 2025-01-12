'use client';

import { BsCheckLg, BsCopy, BsEye } from 'react-icons/bs';
import CopyToClipboard from '../copy-to-clipboard/copy-to-clipboard.comp';
import { ShortLinkProps } from './short-link.types';
import { useState } from 'react';

const ShortLink = ({ link }: ShortLinkProps) => {
	const [copied, setCopied] = useState<boolean>(false);

	const handleCopyToClipboard = () => {
		setCopied(() => true);
		const timeout = setTimeout(() => {
			setCopied(false);
			clearTimeout(timeout);
		}, 2000);
	};

	return (
		<div className="flex gap-3 items-center p-5 justify-between border-b">
			<h1 className="font-mono flex-1 [overflow-wrap:anywhere] text-sm text-blue-400">{link.shortLink}</h1>
			<div className="flex gap-5 items-center">
				<div
					className="cursor-pointer translate-y-[2px]"
					data-tooltip-id="tooltip"
					data-tooltip-content={copied ? 'Copied!' : 'Copy'}
					aria-disabled={copied}
				>
					<CopyToClipboard text={link.shortLink} onCopy={handleCopyToClipboard}>
						{copied ? <BsCheckLg className="text-green-500 text-lg" /> : <BsCopy />}
					</CopyToClipboard>
				</div>
				<div className="flex gap-2 items-center">
					<BsEye className="text-sm" />
					<span className="text-sm">{link.views} views</span>
				</div>
			</div>
		</div>
	);
};

export default ShortLink;
