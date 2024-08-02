import { connectDB } from "@/lib/dbConnect";
import UserModel from "@/Models/user";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // bade C wala that we want to show user and .. chote c wala is what we want to hide ""
      name: "Credentials",
      id: "credentials",
      credentials: {
        identifier: { label: "Username/Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await connectDB();

        try {
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });

          if (!user) {
            throw new Error("No User Found");
          }

          if(user.provider === "Google"){
            throw new Error("Signin Using Google Please");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("Invalid Password");
          }
        } catch (error) {
          throw new Error("Authentication Failed");
        }
      },
    }),

    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
      })
  ],

  callbacks: {

    async signIn({ user, account, profile }) {
      await connectDB();

      console.log(profile)
      console.log(account?.provider)

      if(account?.provider === "google"){

        const user = await UserModel.findOne({email: profile?.email})

        if(!user){

          const newUser = new UserModel({
          email: profile?.email,
          username : profile?.name,
          password: "test",
          wishlist: [],
          expenses: [],
          incomeSources: [],
          monthlyExpenses: [],
          saveTarget: [],
          theme: "light",
          provider: "google"
        })

        console.log(newUser)

        try {
          await newUser.save()
        } catch (error) {
          console.error("Error saving user:", error);
        }
      }
      }

      return true
    },


    // JWT (JSON Web Token):

    // Purpose: The JWT is used to securely store user data on the client side. It is issued upon successful authentication and contains claims (pieces of information) about the user.
    // Lifecycle: The JWT is usually stored in a cookie or local storage on the client side and is sent to the server with each request to verify the user's identity.

    // Session:

    // Purpose: The session object is used to store user data on the server side. It represents an active authenticated session for the user.
    // Lifecycle: The session object is generated from the token when the user makes a request to the server and is often used to populate UI components with user data.

    async session({ session, user, token }) {
      if (token) {
        session.user._id = token._id?.toString();
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.theme = token?.theme;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.username = user.username;
        token.email = user.email;
        token.theme = user?.theme;
      }
      return token;
    },
  },

  pages:{
    signIn: '/login',
    signOut: '/logout',
  },

  session: {
    // to tell that we will be using jwt
    strategy: "jwt",
  },

  secret: process.env.NEXT_AUTH_SECRET,

};
