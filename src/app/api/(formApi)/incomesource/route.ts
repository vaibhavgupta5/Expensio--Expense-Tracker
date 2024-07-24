import { connectDB } from "@/lib/dbConnect";
import UserModel, { incomeSource } from "@/Models/user";
import { NextRequest } from "next/server";

export  async function POST(req: NextRequest) {
  await connectDB();

  const { username, IncomeAmount, incomeSources } = await req.json();

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

    user.incomeSources.push({
        incomeSource: incomeSources,
        amount: IncomeAmount,
        createdAt: todayDate,
    } as incomeSource)
    
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