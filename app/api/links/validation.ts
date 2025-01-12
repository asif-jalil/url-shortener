import { z } from 'zod';

export const createLinkSchema = z.object({
	link: z.string({ required_error: 'Link is required' }).url({ message: 'Invalid link' }),
});

export type CreateLinkInput = z.infer<typeof createLinkSchema>;
