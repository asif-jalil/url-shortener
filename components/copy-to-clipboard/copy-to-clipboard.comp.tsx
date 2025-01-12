'use client';

import React from 'react';
import copy from 'copy-to-clipboard';
import type { CopyToClipboardProps } from './copy-to-clipboard.types';

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ text, children, onCopy }) => {
	const handleClick = () => {
		const result = copy(text);
		if (onCopy) {
			onCopy(text, result);
		}
	};

	// @ts-expect-error ignore this error
	return React.cloneElement(children as React.ReactElement, { onClick: handleClick });
};

export default CopyToClipboard;
