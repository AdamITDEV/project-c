// app/api/userRepos/route.ts
import { NextResponse } from 'next/server'
import user_repos from 'models/User_repos'
import { getServerSession } from 'next-auth'
import { authOptions } from 'config/auth'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
    const userRepos = await user_repos.find({ id_user: userId, status: true })

    if (!userRepos || userRepos.length === 0) {
      return NextResponse.json(
        { message: 'No repositories found or status is false' },
        { status: 404 },
      )
    }

    return NextResponse.json({
      message: 'User repositories fetched successfully',
      userRepos: userRepos,
    })
  } catch (error) {
    console.error('Error fetching user repositories:', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
