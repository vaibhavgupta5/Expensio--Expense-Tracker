import { connectDB } from "@/lib/dbConnect";
import UserModel, { incomeSource, monthlyExpenses, saveTarget, Wishlist } from "@/Models/user";
import { NextRequest } from "next/server";

export  async function POST(req: NextRequest) {
  await connectDB();

  const { wishlistName, wishlishAmt, wishlistAchieveDate, expenseSource, expenseAmount, saveTarget, username, IncomeAmount, incomeSources } =
    await req.json();

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

    let wishlist = {
        name: wishlistName,
        amount: wishlishAmt,
        achieveTill: wishlistAchieveDate,
        createdAt: todayDate,
    }

    // bina schema define kre dikal krega
    user.wishlist.push(wishlist as Wishlist)

    user.monthlyExpenses.push({
        expenseSource,
        amount: expenseAmount,
        createdAt: todayDate,
    } as monthlyExpenses)

    user.incomeSources.push({
        incomeSource: incomeSources,
        amount: IncomeAmount,
        createdAt: todayDate,
    } as incomeSource)

    user.saveTarget = {
        amount: saveTarget,
        createdAt: todayDate,
    } as saveTarget

    user.save();

    console.log(user)

    return Response.json(
      {
        message: "Profile updated successfully",
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

