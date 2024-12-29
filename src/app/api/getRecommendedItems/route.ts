import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from 'config/auth'
import { connectDB } from 'config/mongodb'
import User from 'models/User'
import user_repos from 'models/User_repos'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id

    await connectDB()

    const user = await User.findById(userId)
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    const { user_tags1, user_tags2, user_tags3 } = user

    const articles = await user_repos.find(
      {
        $or: [
          { Tags_Article1: user_tags1 },
          { Tags_Article2: user_tags2 },
          { Tags_Article3: user_tags3 },
        ],
      },
      {
        Id_article: 1,
        Title: 1,
        Content: 1,
        Tags_Article1: 1,
        Tags_Article2: 1,
        Tags_Article3: 1,
        Id_Stores: 1,
      },
    )

    if (!articles || articles.length === 0) {
      return NextResponse.json({ message: 'No recommended articles found' }, { status: 404 })
    }

    return NextResponse.json({
      message: 'Recommended articles fetched successfully',
      recommendedItems: articles,
    })
  } catch (error) {
    console.error('Error fetching recommended articles:', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
