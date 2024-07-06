import bcrypt from "bcrypt";
import NextAuth from "next-auth/next";
import { AuthOptions } from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

import { Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";

import prisma from "@/lib/prisma";

// Helper function to check environment variables
function getEnvVariable(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    Github({
      clientId: getEnvVariable("GITHUB_ID"),
      clientSecret: getEnvVariable("GITHUB_SECRET"),
    }),
    Google({
      clientId: getEnvVariable("GOOGLE_CLIENT_ID"),
      clientSecret: getEnvVariable("GOOGLE_CLIENT_SECRET"),
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user || !user?.hashedPassword) {
          console.log("User not found or password not set");
          throw new Error("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        if (!isPasswordValid) {
          console.log("Invalid password");
          throw new Error("Invalid credentials");
        }
        return user;
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: getEnvVariable("NEXTAUTH_SECRET"),
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
