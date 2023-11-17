import { getServerSession, type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db";
import "dotenv/config";
import { users, type roleLiteral } from "@/lib/db/schema/roleBased";
import { eq } from "drizzle-orm";

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  debug: process.env.NODE_ENV !== "production",
  secret: process.env["NEXTAUTH_SECRET"]!,
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env["GOOGLE_CLIENT_ID"]!,
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"]!,
    }),
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("No credentials sent");
        }
        const user = (
          await db
            .select()
            .from(users)
            .where(eq(users.email, credentials.email))
        )[0];
        if (!user) {
          return null;
          // throw new Error("Invalid credentials");
        }
        if (user.password !== credentials?.password) {
          throw new Error("Have'nt logged in with google yet");
        }
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name as string;
        session.user.email = token.email;
        session.user.image = token["image"] as string;
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user }) {
      const dbUser = (
        await db
          .select()
          .from(users)
          .where(eq(users.email, token.email as string))
      )[0];
      if (!dbUser) {
        token.id = user.id;
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        image: dbUser.image,
        role: dbUser.role,
      };
    },
    redirect() {
      return "/dashboard";
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
