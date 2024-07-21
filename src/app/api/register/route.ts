import { connectDB } from "@/lib/dbConnect";
import UserModel from "@/Models/user";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs"


export async function POST(req: NextRequest){

    await connectDB();

    try {

        const { email, username, password } = await req.json();
        
        const userEmail = await UserModel.findOne({email})
        const userUserName = await UserModel.findOne({username})

        if(userEmail){
            return Response.json(
                {
                    success: false,
                    message: "Email already exists"
                },
                {
                    status: 400
                }
            )
        }

        if(userUserName){
            return Response.json(
                {
                    success: false,
                    message: "Username already exists"
                },
                {
                    status: 400
                }
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new UserModel({
            email,
            username,
            password: hashedPassword,
            wishlist: [],
            expenses: [],
            incomeSources: [],
            monthlyExpenses: [],
            saveTarget: [],
            theme: "light"
        })

        await newUser.save()

        return Response.json(
            {
                success: true,
                message: "Successfully Registered"
            },
            {
                status: 200
            }
        )


    } catch (error) {
        return Response.json(
            {
                success: false,
                message: "Server Error"
            },
            {
                status: 500
            }
        )
    }
}