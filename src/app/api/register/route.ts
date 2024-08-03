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
            console.log("1")
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
            console.log("2")
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
            wishlist: [
                {
                    amount: 0,
                    name: "Demo Trip",
                    createdAt: Date.now(),
                    achieveTill: Date.now()
                  }
            ],
            expenses: [  {
                amount: 0,
                title: "Demo Expense",
                createdAt: Date.now(),
              }],
            incomeSources: [
                {
                    amount: 50000,
                    createdAt: Date.now()
                }
            ],
            monthlyExpenses: [
                {
                    amount: 0,
                    expenseSource: "Demo Rent",
                    createdAt: Date.now(),
                  }
            ],
            saveTarget: [],
            theme: "light",
            provider: "form"
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
        console.log(error)
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