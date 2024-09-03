import * as z from 'zod';

export const schema = z.object({
    name: z.string().min(3),
});

export type CategoryFormData = z.infer<typeof schema>;