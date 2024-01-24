import { ConnectDB } from "@/backend/ConnectDB";
import UserSchema from "@/backend/UserSchema";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
const bcrypt = require("bcrypt");

export const authOptions: any = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials: any) {
        const { email, password } = credentials;

        try {
          await ConnectDB();
          const user = await UserSchema.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
