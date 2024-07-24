import { connectDB } from "@/lib/dbConnect";
import UserModel, { saveTarget } from "@/Models/user";
import { NextRequest } from "next/server";

export  async function POST(req: NextRequest) {
  await connectDB();

  const { username, saveTarget } = await req.json();

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

    user.saveTarget = {
        amount: saveTarget,
        createdAt: todayDate,
    } as saveTarget 
    
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