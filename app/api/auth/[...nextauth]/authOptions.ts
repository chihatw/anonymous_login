import { authAdnimSDK } from "@/firebase/admin";
import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/signin",
  },
  providers: [
    CredentialsProvider({
      credentials: {},

      async authorize(credentials): Promise<User | null> {
        const { idToken } = credentials as {
          idToken: string;
        };
        try {
          const decodedIdToken = await authAdnimSDK.verifyIdToken(idToken);
          // name, email, image などが渡される
          return decodedIdToken as unknown as User;
        } catch (e) {
          return null;
        }
      },
    }),
  ],
  // firebase auth から next auth に値を渡したい時は session, callback を使う
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // たぶん、authorize で返された user を受け取る
    jwt: async ({ token, user }) => {
      // user 情報を token に統合
      return { ...token, ...user };
    },
    session: ({ session, token }) => {
      // token の中の必要な情報を session に持たせる
      session.user.uid = token.uid as string;
      session.user.isAnonymous = ((token.firebase as any).sign_in_provider ===
        "anonymous") as boolean;
      return session;
    },
  },
};
