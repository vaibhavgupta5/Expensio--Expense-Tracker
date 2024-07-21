import "next-auth"

declare module "next-auth" {

    interface User {
        _id?: string;
        username: string;
        email: string;
        theme: string;
    }

    interface Session {
        user:{
            _id: string,
            username: string,
            email: string,
            theme: string;
        } & DefaultSession["user"];
    }

}