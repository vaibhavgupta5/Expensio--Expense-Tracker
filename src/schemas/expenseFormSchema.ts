import {z} from "zod"

export const expenseFormSchema = z.object({
    expenseSource: z
    .string()
    .max(10, {message: 'Too Long, write in short please!'}), 
    amount: z.number(),
 });
