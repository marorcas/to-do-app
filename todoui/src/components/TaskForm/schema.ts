import * as z from 'zod';

export const schema = z.object({
    description: z.string().min(5),
    // category: z.object({
    //     name: z.string().min(3).optional(),
    // }),
    categoryId: z.number().optional(),
});

export type TaskFormData = z.infer<typeof schema>;