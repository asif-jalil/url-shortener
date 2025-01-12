import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

interface Params {
	shortCode: string;
}

export async function GET(req: Request, { params }: { params: Promise<Params> }): Promise<Response> {
	const shortCode = (await params).shortCode;

	const link = await prisma.linkList.findUnique({
		where: { shortLinkCode: shortCode },
		select: { id: true, originalLink: true, views: true },
	});

	if (!link) {
		return NextResponse.redirect(new URL(process.env.APP_URL as string));
	}

	await prisma.linkList.update({ data: { views: link.views + 1 }, where: { shortLinkCode: shortCode } });

	return NextResponse.redirect(new URL(link.originalLink));
}
