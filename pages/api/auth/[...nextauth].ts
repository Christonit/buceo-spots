import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/app/firebase";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  pages: {
    signIn: "/signin",
  },
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        console.log({ credentials });
        return await signInWithPopup(auth, new GoogleAuthProvider())
          .then((userCredential) => {
            if (userCredential.user) {
              return userCredential.user;
            }
            return null;
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log({ errorCode, errorMessage });
          });
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.uid = user.uid;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user.uid = token.uid;
      session.user.email = token.email;
      return session;
    },
  },
};
export default NextAuth(authOptions);
