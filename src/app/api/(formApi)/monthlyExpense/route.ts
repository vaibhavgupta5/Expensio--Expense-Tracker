import { connectDB } from "@/lib/dbConnect";
import UserModel, { monthlyExpenses } from "@/Models/user";
import { NextRequest } from "next/server";

export  async function POST(req: NextRequest) {
  await connectDB();

  const { username, expenseSource, expenseAmount } = await req.json();

  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return Response.json(
        {
          message: "User not found",
          success: false,
        },
        {
          status: 404,
        }
      )
    }

    const todayDate = new Date()

    const income = user.incomeSources[0].amount;

    user.incomeSources[0].amount = income - expenseAmount

    user.monthlyExpenses.push({
        expenseSource,
        amount: expenseAmount,
        createdAt: todayDate,
    } as monthlyExpenses)
    
    user.save()

    return Response.json(
      {
        message: "Sucess",
        success: true,
      },
      {
        status: 200,
      }
    ); 


} catch (error) {

    
    return Response.json(
        {
          message: "Server Error",
          success: false,
        },
        {
          status: 500,
        }
      ); 

  }
}