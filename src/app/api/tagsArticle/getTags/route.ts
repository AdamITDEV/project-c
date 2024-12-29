import { NextResponse } from 'next/server'
import user_repos from 'models/User_repos' // Import user_repos model
import { getServerSession } from 'next-auth'
import { authOptions } from 'config/auth'
import { connectDB } from 'config/mongodb'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id

    // Fetch all user_repos entries for the user
    await connectDB()
    const repos = await user_repos.find({ Id_User: userId })

    if (!repos || repos.length === 0) {
      return NextResponse.json({ message: 'No articles found' }, { status: 404 })
    }

    const updatedRepos = await Promise.all(
      repos.map(async (repo) => {
        const missingTags = []
        if (!repo.Tags_Article1) missingTags.push('Tags_Article1')
        if (!repo.Tags_Article2) missingTags.push('Tags_Article2')
        if (!repo.Tags_Article3) missingTags.push('Tags_Article3')

        if (missingTags.length > 0) {
          const defaultTags = ['Tag1', 'Tag2', 'Tag3']

          const updates: Partial<typeof repo> = {}
          if (missingTags.includes('Tags_Article1')) updates.Tags_Article1 = defaultTags[0]
          if (missingTags.includes('Tags_Article2')) updates.Tags_Article2 = defaultTags[1]
          if (missingTags.includes('Tags_Article3')) updates.Tags_Article3 = defaultTags[2]

          // Update the database
          await user_repos.findByIdAndUpdate(repo._id, updates)

          // Reflect changes in the current repo object
          Object.assign(repo, updates)
        }

        return repo
      }),
    )

    return NextResponse.json({
      message: 'Articles and tags fetched successfully',
      articles: updatedRepos,
    })
  } catch (error) {
    console.error('Error fetching articles and tags:', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
