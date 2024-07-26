import {z} from "zod"

export const infoformSchema = z.object({
    wishlistName : z.string(),
    wishlishAmt: z.string(), 
    wishlistAchieveDate: z.date(), 
    expenseSource: z.string(), 
    expenseAmount: z.string(), 
    saveTarget: z.string(), 
    username: z.string(), 
    IncomeAmount: z.string()
})