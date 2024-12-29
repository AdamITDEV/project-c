// app/api/getUserRepos/route.ts
import { NextResponse } from 'next/server'
import { connectDB } from 'config/mongodb'
import { getServerSession } from 'next-auth'
import { authOptions } from 'config/auth'
import user_repos from 'models/User_repos'
import User from 'models/User' // Model của user

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    const userId = session.user.id

    // Lấy thông tin user từ database và kiểm tra status
    const user = await User.findById(userId)
    if (!user || !user.status) {
      return NextResponse.json({ message: 'Forbidden: User status is false' }, { status: 403 })
    }

    // Tìm tất cả `user_repos` có `id_user` trùng với `_id` của user
    const repos = await user_repos.find({ Id_User: userId })

    if (!repos || repos.length === 0) {
      return NextResponse.json({ message: 'No repositories found' }, { status: 404 })
    }

    return NextResponse.json({
      message: 'Repositories fetched successfully',
      repos,
    })
  } catch (error) {
    console.error('Error fetching user repos:', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
