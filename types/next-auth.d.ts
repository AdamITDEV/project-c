// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: ObjectId // Add `id` to the session
      name?: string | null
      email?: string | null
      image?: string | null
      publicId?: string | null
      description?: string | null
      status?: boolean | null
      follower?: Int32 | null
      viewerprofile?: Int32 | null
      experienttags?: string | null
      id_stogare?: ObjectId | null
      id_rating?: ObjectId | null
      user_tags1?: string | null
      user_tags2?: string | null
      user_tags3?: string | null
    }
  }
}
