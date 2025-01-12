import { Prisma } from '@prisma/client';
import { getUniqueId } from '@/utils/get-unique-id';
import { prisma } from '@/lib/prisma';

const getRandom = async () => {
	const uniqueId = getUniqueId();

	const isFound = await prisma.linkList.findUnique({ where: { shortLinkCode: uniqueId } });

	if (isFound) {
		console.log('Found duplicate, generating new id');

		return getRandom();
	}

	return uniqueId;
};

export const linkListExtension = Prisma.defineExtension((client) => {
	return client.$extends({
		result: {
			linkList: {
				shortLink: {
					needs: { shortLinkCode: true },
					compute(data) {
						return [process.env.APP_URL, data.shortLinkCode].join('/');
					},
				},
			},
		},
		query: {
			linkList: {
				async create({ args, query }) {
					const uniqueId = await getRandom();
					args.data.shortLinkCode = uniqueId;

					return query(args);
				},
			},
		},
	});
});
