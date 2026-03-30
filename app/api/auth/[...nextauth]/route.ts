/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/auth/route.ts
import { mongooseConnect } from "@/db/mongoose";
import { ClientUser } from "@/db/model/Clientuser.model";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from 'bcrypt';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // authorize: async (credentials) => {
      //   try {
      //     await mongooseConnect();
      //     if (credentials) {
      //       const user = await ClientUser.findOne({
      //         $and: [
      //           { email: credentials.email, password: credentials.password },
      //         ],
      //       });
      //       if (user) {
      //         return {
      //           id: user._id,
      //           email: user.email,
      //           role: user?.role,
      //           name: user?.name,
      //         };
      //       }
      //     }
      //     return null;
      //   } catch (error: any) {
      //     console.log(error.message);
      //     return null;
      //   }
      // },
      authorize: async (credentials) => {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required.");
          }

          await mongooseConnect();

          const user = await ClientUser.findOne({ email: credentials.email });          

          if (!user) {
            throw new Error("No user found with this email.");
          }


          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);          
          if (!isPasswordValid) throw new Error("Invalid password.");

          // if (user.password !== credentials.password) {
          //   throw new Error("Invalid password.");
          // }

          return {
            id: user._id.toString(),
            email: user.email,
            role: user.role,
            name: user.name,
          };
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth", // Custom sign-in page
  },
  callbacks: {
    async signIn({ user }) {
      await mongooseConnect();
      const existingUser = await ClientUser.findOne({
        email: user.email,
      }).select("_id");
      if (!existingUser) {
        const newuser = await ClientUser.create({
          name: user.name,
          email: user.email,
          password: null,
          role: "user",
          address: [],
        });
        user.id = newuser._id.toString();
      } else {
        user.id = existingUser._id.toString();
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.name = user?.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.user.name = token?.name as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
