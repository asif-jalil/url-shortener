import { ReactElement } from 'react';

export interface CopyToClipboardProps {
	text: string;
	children: ReactElement;
	onCopy?: (text: string, result: boolean) => void;
}
