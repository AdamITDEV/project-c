import { NextResponse } from 'next/server'
import { connectDB } from 'config/mongodb'
import User from 'models/User'
import { getServerSession } from 'next-auth'
import { authOptions } from 'config/auth'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id // Lấy ID người dùng từ session
    const { imageUrl } = await req.json()

    if (!imageUrl) {
      return NextResponse.json({ message: 'Image URL is required' }, { status: 400 })
    }

    await connectDB()

    const updatedUser = await User.findByIdAndUpdate(userId, { image: imageUrl }, { new: true })

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({
      message: 'Avatar updated successfully',
      user: {
        id: updatedUser._id,
        image: updatedUser.image,
      },
    })
  } catch (error) {
    console.error('Error updating avatar:', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
