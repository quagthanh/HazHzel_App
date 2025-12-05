import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { InactiveAccountError, InvalidEmailPasswordError } from "./utils/error";
import { IUser } from "./types/next-auth";
import { IBackendRes, ILogin, loginDTO } from "./types/backend";
import { handleLogin } from "./services/auth.api";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        const login = {
          username: credentials.username,
          password: credentials.password,
        } as loginDTO;
        const res = await handleLogin(login);
        if (res?.data?.statusCode === 201) {
          return {
            _id: res.data?.data?.user?._id,
            name: res.data?.data?.user?.name,
            email: res.data?.data?.user?.email,
            roles: res.data?.data?.user?.roles,
            access_token: res.data?.data?.user?.access_token,
          };
        } else if (res?.response?.data?.statusCode === 401) {
          throw new InvalidEmailPasswordError();
        } else if (res?.response?.data?.statusCode === 400) {
          throw new InactiveAccountError();
        } else {
          throw new Error("Internal server error");
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.user = user as IUser;
      }
      return token;
    },
    session({ session, token }) {
      (session.user as IUser) = token.user;
      return session;
    },
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
  },
});
