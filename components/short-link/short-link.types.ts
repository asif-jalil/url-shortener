export interface ShortLinkProps {
	link: Link;
}

export interface Link {
	id: number;
	originalLink: string;
	views: number;
	shortLink: string;
}
