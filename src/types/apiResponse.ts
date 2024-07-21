//jo jo frontent me bhejna h
//Api response frontent me use hota h

import { Wishlist } from "@/Models/user";
import { expenses } from "@/Models/user";
import { saveTarget } from "@/Models/user";
import { incomeSource } from "@/Models/user";
import { monthlyExpenses } from "@/Models/user";

export interface apiResponse{
    success: boolean;
    message: string;
    wishlist?: Array<Wishlist>;
    expenses?: Array<expenses>;
    saveTarget?: Array<saveTarget>;
    incomeSources?: Array<incomeSource>;
    monthlyExpenses?: Array<monthlyExpenses>;
    data?: any;
}
