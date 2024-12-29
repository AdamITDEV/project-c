import { NextResponse } from 'next/server'
import tags from 'models/Tags'
import User from 'models/User'
import { getServerSession } from 'next-auth'
import { authOptions } from 'config/auth'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const allTags = await tags.find({})

    if (!allTags || allTags.length === 0) {
      return NextResponse.json({ message: 'No tags found' }, { status: 404 })
    }

    const userId = session.user.id
    const user = await User.findById(userId)

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    const missingTags = []
    if (!user.user_tags1) missingTags.push('user_tags1')
    if (!user.user_tags2) missingTags.push('user_tags2')
    if (!user.user_tags3) missingTags.push('user_tags3')

    if (missingTags.length > 0) {
      const firstThreeTags = await tags.find({}).limit(3)

      if (firstThreeTags.length < 3) {
        return NextResponse.json({ message: 'Insufficient tags available' }, { status: 400 })
      }

      const updates: Partial<typeof user> = {}
      if (missingTags.includes('user_tags1')) updates.user_tags1 = firstThreeTags[0].Tag_Name
      if (missingTags.includes('user_tags2')) updates.user_tags2 = firstThreeTags[1].Tag_Name
      if (missingTags.includes('user_tags3')) updates.user_tags3 = firstThreeTags[2].Tag_Name

      await User.findByIdAndUpdate(userId, updates)
      Object.assign(user, updates)
    }

    return NextResponse.json({
      message: 'Tags fetched successfully',
      tags: allTags,
      userSelectedTags: [user.user_tags1, user.user_tags2, user.user_tags3].filter(Boolean),
    })
  } catch (error) {
    console.error('Error fetching tags:', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
