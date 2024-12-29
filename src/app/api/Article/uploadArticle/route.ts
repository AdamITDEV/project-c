import { NextResponse } from 'next/server'
import { connectDB } from 'config/mongodb'
import { getServerSession } from 'next-auth'
import { authOptions } from 'config/auth'
import user_repos from 'models/User_repos'
import { NextRequest } from 'next/server'
import User from 'models/User'
export async function POST(req: NextRequest) {
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
    const user = await User.findById(userId)
    // Parse the incoming request body
    const { title, content } = await req.json()

    if (!title || !content) {
      return NextResponse.json({ message: 'Title and content are required' }, { status: 400 })
    }

    // Create a new user_repos entry in MongoDB
    const newRepo = await user_repos.create({
      Id_stores: Math.floor(Math.random() * 100000), // Random store ID
      Id_User: userId, // Using the session userId
      Title: title,
      Content: content,
      Date_time: new Date().toISOString(),
      Image_content: '',
      Label: 'document',
      Total_viewer: '0',
      status: true,
      Tags_Article1: user.user_tags1 || '', // Gắn tags từ user
      Tags_Article2: user.user_tags2 || '',
      Tags_Article3: user.user_tags3 || '',
    })

    // Return success response
    return NextResponse.json({
      message: 'Article uploaded successfully',
      repo: newRepo,
    })
  } catch (error) {
    console.error('Error uploading article:', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
