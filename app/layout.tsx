import type { Metadata } from 'next';
import './globals.css';
import { Kumbh_Sans } from 'next/font/google';
import Tooltip from '@/components/tooltip/tooltip.comp';

const kumbhSans = Kumbh_Sans({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700'],
	variable: '--font-kumbh-sans',
});

export const metadata: Metadata = {
	title: 'URL Shortener',
	description: 'Make any URL shorter and easier to share',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<main className={`${kumbhSans.variable} font-kumbh-sans`}>{children}</main>
				<Tooltip />
			</body>
		</html>
	);
}
