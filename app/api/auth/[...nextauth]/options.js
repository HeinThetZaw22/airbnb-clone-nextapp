import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../../models/user";
import { connectToDB } from "../../../../lib/database";
import NextAuth from "next-auth";
import bcrypt from "bcryptjs";
export const options = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'openid email profile',
        }
      }
    }),
    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: { label: "email", type: "text", placeholder: "your-name" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "your-password",
        },
      },

      async authorize(credentials) {
        // retrive data from dababase
        await connectToDB();
        // await User.createIndex({ email: 1 });
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await User.findOne({ email: credentials.email }).select(
          "+password"
        );
        if (!user) {
          throw new Error("No user found with this email");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  // callbacks: {
  //   //sign in or create new user
  //   async signIn({ profile }) {
  //     try {
  //       // console.log("start to db connect");
  //       await connectToDB();
  //       const UserExist = await User.findOne({
  //         email: profile.email,
  //       });
  //       if (!UserExist) {
  //         await User.create({
  //           email: profile.email,
  //           username: profile.name.replace(" ", "").toLowerCase(),
  //           image: profile.picture,
  //         });
  //       }
  //       return true;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },
  // },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      await connectToDB();
      if (account.provider === "google") {
        const existingUser = await User.findOne({ email: profile.email });
        if (!existingUser) {
          await User.create({
            email: profile.email,
            name: profile.name,
            image: profile.picture || profile.picture_url, // Use appropriate field for the picture
            oauth: true,
          });
        } else {
          // Update the existing user's image if needed
          existingUser.image = profile.picture || profile.picture_url;
          await existingUser.save();
        }
      }
      return true;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account?.provider === "github" || account?.provider === "google") {
        token.picture = profile.picture || profile.avatar_url; // GitHub uses avatar_url, Google uses picture
      } else if (user) {
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.image = token.picture;
      return session;
    },
  },


  session: {
    jwt: true,
  },
  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(options);
