import { NextResponse } from 'next/server';
import { z, ZodSchema } from 'zod';

export const validate =
	<T extends ZodSchema>(schema: T) =>
	(handler: (req: Request & { body: z.infer<T> }) => Promise<Response>) =>
	async (req: Request): Promise<Response> => {
		try {
			const body = await req.json();
			const validatedBody = schema.parse(body);
			const modifiedReq = Object.assign({}, req, { body: validatedBody });
			return handler(modifiedReq);
		} catch (error: unknown) {
			if (error instanceof z.ZodError) {
				return NextResponse.json(
					{
						success: false,
						errors: error.errors.reduce((acc: Record<string, string>, curr) => {
							acc[curr.path[0]] = curr.message;
							return acc;
						}, {}),
					},
					{ status: 400 },
				);
			}
			return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
		}
	};
