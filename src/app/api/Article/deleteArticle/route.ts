import { NextResponse } from 'next/server'
import { connectDB } from 'config/mongodb'
import { getServerSession } from 'next-auth'
import { authOptions } from 'config/auth'
import user_repos from 'models/User_repos'

export async function DELETE() {
  try {
    // Get the session
    const session = await getServerSession(authOptions)

    // Check if the session exists and contains user data
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    // Get the userId from the session
    const userId = session.user.id

    // Connect to the MongoDB database
    await connectDB()

    // Find the latest article by creation time for the user
    const latestArticle = await user_repos.findOne({ Id_User: userId }).sort({ createdAt: -1 })

    if (!latestArticle) {
      return NextResponse.json({ message: 'No articles found for the user' }, { status: 404 })
    }

    // Delete the article
    const deletedRepo = await user_repos.findByIdAndDelete(latestArticle._id)

    if (!deletedRepo) {
      return NextResponse.json({ message: 'Failed to delete the article' }, { status: 500 })
    }

    // Return success response
    return NextResponse.json({
      message: 'Article deleted successfully',
      repo: deletedRepo,
    })
  } catch (error) {
    console.error('Error deleting article:', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
