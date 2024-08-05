import { connectDB } from "@/lib/dbConnect";
import UserModel from "@/Models/user";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
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

          if (user.provider === "google") {
            throw new Error("Please sign in using Google");
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
          console.error("Error during authentication:", error);
          throw new Error("Authentication Failed");
        }
      },
    }),

  //   GoogleProvider({
  //     clientId: process.env.GOOGLE_CLIENT_ID as string,
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  //   }),
  // ],

  callbacks: {
    // async signIn({ user, account, profile }) {
    //   await connectDB();

    //   if (account?.provider === "google") {
    //     try {
    //       const existingUser = await UserModel.findOne({ email: profile?.email });

    //       if (!existingUser) {
    //         const newUser = new UserModel({
    //           email: profile?.email,
    //           username: profile?.name,
    //           password: "test", // This should be handled securely
    //           wishlist: [
    //             {
    //               amount: 0,
    //               name: "Demo Trip",
    //               createdAt: Date.now(),
    //               achieveTill: Date.now(),
    //             },
    //           ],
    //           expenses: [
    //             {
    //               amount: 0,
    //               title: "Demo Expense",
    //               createdAt: Date.now(),
    //             },
    //           ],
    //           incomeSources: [
    //             {
    //               amount: 50000,
    //               createdAt: Date.now(),
    //             },
    //           ],
    //           monthlyExpenses: [
    //             {
    //               amount: 0,
    //               expenseSource: "Demo Rent",
    //               createdAt: Date.now(),
    //             },
    //           ],
    //           saveTarget: [],
    //           theme: "light",
    //           provider: "google",
    //         });

    //         await newUser.save();
    //       }
    //     } catch (error) {
    //       console.error("Error saving user:", error);
    //       return false;
    //     }
    //   }

    //   return true;
    // },

    async session({ session, token }) {
      if (token) {
        session.user = {
          _id: token._id?.toString(),
          username: token.username,
          email: token.email,
          theme: token?.theme,
          provider: token?.provider,
        };
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.username = user.username;
        token.email = user.email;
        token.theme = user?.theme;
        token.provider = user?.provider;
      }
      return token;
    },
  },

  pages: {
    signIn: "/login",
    signOut: "/logout",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXT_AUTH_SECRET,
};
