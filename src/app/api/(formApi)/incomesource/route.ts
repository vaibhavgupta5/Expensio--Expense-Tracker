import { connectDB } from "@/lib/dbConnect";
import UserModel, { incomeSource } from "@/Models/user";
import { getServerSession, User } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";

export  async function POST(req: NextRequest) {
  await connectDB();

  const { username, IncomeAmount } = await req.json();

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
        amount: IncomeAmount,
        createdAt: todayDate,
    } as incomeSource)

    await user.save()

    return Response.json(
      {
        message: "Success",
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

export async function GET(req: NextRequest){

  await connectDB();
  const session = await getServerSession(authOptions)

  const user : User= session?.user;
  const username :any = user.username


  if(!user){
    return Response.json(
      {
        message: "No user Found",
        success: false,
      },
      {
        status: 500,
      }
    ); 
  }

  try {

    const userMain = await UserModel.findOne({username})

    if(!userMain){
    return Response.json(
      {
        message: "No user Found",
        success: false,
      },
      {
        status: 500,
      }
    ); 
  }

  return Response.json(
    {
      message: "Success",
      success: true,
      data: userMain.incomeSources,
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
    )
  }
  
}