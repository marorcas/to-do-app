import * as z from 'zod';

export const schema = z.object({
    description: z.string().min(5),
    // isCompleted: z.boolean(),
    categoryId: z.number().optional(),
});

export type TaskFormData = z.infer<typeof schema>;