import { NextResponse } from 'next/server'
import user_repos from 'models/User_repos' // Import the user_repos model
import { getServerSession } from 'next-auth'
import { authOptions } from 'config/auth'
import { connectDB } from 'config/mongodb'

// GET method to fetch all repos for the logged-in user
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    // Check if the session and user are valid
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id

    // Connect to the database
    await connectDB()

    // Fetch all repos for the logged-in user
    const repos = await user_repos.find({ Id_User: userId })

    // If no repos are found for the user
    if (!repos || repos.length === 0) {
      return NextResponse.json({ message: 'No repositories found for the user' }, { status: 404 })
    }

    // Return the list of repos for the logged-in user
    return NextResponse.json({
      message: 'Repositories fetched successfully',
      repos,
    })
  } catch (error) {
    console.error('Error fetching repositories:', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}

// PUT method to update a specific repo (edit)
export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    // Check if the session and user are valid
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
    const { repoId, updates } = await req.json() // Get the repoId and the updates from the request body

    // Connect to the database
    await connectDB()

    // Find the repo by Id_User and repoId
    const repo = await user_repos.findOne({ _id: repoId, Id_User: userId })

    if (!repo) {
      return NextResponse.json({ message: 'Repo not found' }, { status: 404 })
    }

    // Update the repo with the provided updates
    const updatedRepo = await user_repos.findByIdAndUpdate(repoId, updates, { new: true })

    return NextResponse.json({
      message: 'Repository updated successfully',
      repo: updatedRepo,
    })
  } catch (error) {
    console.error('Error updating repository:', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}

// DELETE method to delete a specific repo
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    // Check if the session and user are valid
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
    const { repoId } = await req.json() // Get the repoId from the request body

    // Connect to the database
    await connectDB()

    // Find the repo by Id_User and repoId
    const repo = await user_repos.findOne({ _id: repoId, Id_User: userId })

    if (!repo) {
      return NextResponse.json({ message: 'Repo not found' }, { status: 404 })
    }

    // Delete the repo from the database
    await user_repos.findByIdAndDelete(repoId)

    return NextResponse.json({
      message: 'Repository deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting repository:', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
