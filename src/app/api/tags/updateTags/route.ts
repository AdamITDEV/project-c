import { NextResponse } from 'next/server'
import User from 'models/User'
import { getServerSession } from 'next-auth'
import { authOptions } from 'config/auth'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { tags } = await req.json()

    if (!tags || !Array.isArray(tags) || tags.length > 3) {
      return NextResponse.json({ message: 'Invalid tags provided' }, { status: 400 })
    }

    const userId = session.user.id
    const user = await User.findById(userId)

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    // Update user tags in the database
    const updates: Partial<typeof user> = {
      user_tags1: tags[0] || null,
      user_tags2: tags[1] || null,
      user_tags3: tags[2] || null,
    }

    await User.findByIdAndUpdate(userId, updates)

    return NextResponse.json({ message: 'Tags updated successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error updating tags:', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
