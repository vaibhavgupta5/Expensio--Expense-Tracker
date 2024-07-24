import { connectDB } from "@/lib/dbConnect";
import UserModel, { Wishlist } from "@/Models/user";
import { NextRequest } from "next/server";

export  async function POST(req: NextRequest) {
  await connectDB();

  const { wishlistName, wishlishAmt, wishlistAchieveDate,  username } = await req.json();

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