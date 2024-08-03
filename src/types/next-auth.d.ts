import "next-auth"

declare module "next-auth" {

    interface User {
        _id?: string;
        username: string;
        email: string;
        theme: string;
        provider: string;
    }

    interface Session {
        user:{
            _id: string,
            username: string,
            email: string,
            theme: string;
            provider: string;
        } & DefaultSession["user"];
    }

}