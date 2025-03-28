import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name?: string;
    avatar?: string;
    role?: string;
    bio?: string;
  }

  interface Session {
    user: {
      id: string;
      name?: string;
      email?: string;
      avatar?: string;
      role?: string;
      bio?: string;
    } & DefaultSession["user"];
  }
}