import { connectDB } from './mongodb'
import User from '../models/User'
import type { NextAuthOptions } from 'next-auth'
import credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  providers: [
    credentials({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await connectDB()

        const user = await User.findOne({
          email: credentials?.email,
        }).select('+password')

        if (!user) {
          throw new Error('Wrong Email')
        }

        const passwordMatch = await bcrypt.compare(credentials!.password, user.password)

        if (!passwordMatch) {
          throw new Error('Wrong Password')
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          publicId: user.publicId,
          description: user.description,
          status: user.status,
          follower: user.follower,
          viewerprofile: user.viewerprofile,
          experienttags: user.experienttags,
          id_stogare: user.id_stogare,
          id_rating: user.id_rating,
          user_tags1: user.user_tags1,
          user_tags2: user.user_tags2,
          user_tags3: user.user_tags3,
        }
      },
    }),
  ],

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token.id) {
        await connectDB()
        const user = await User.findById(token.id)

        if (user) {
          session.user = {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: user.image,
            publicId: user.publicId,
            description: user.description,
            status: user.status,
            follower: user.follower,
            viewerprofile: user.viewerprofile,
            experienttags: user.experienttags,
            id_stogare: user.id_stogare,
            id_rating: user.id_rating,
            user_tags1: user.user_tags1,
            user_tags2: user.user_tags2,
            user_tags3: user.user_tags3,
          }
        }
      }

      return session
    },
  },
}
