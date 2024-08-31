import * as z from 'zod';

export const schema = z.object({
    description: z.string().min(5),
    category: z.string().min(1),
});

export type TaskFormData = z.infer<typeof schema>;