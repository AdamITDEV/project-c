'use client'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'

type Tag = {
  _id: string
  Tag_Name: string
}

const Tags = () => {
  const [hiddenalltags, setHiddenAllTags] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [allTags, setAllTags] = useState<Tag[]>([])
  const { data: session } = useSession()
  useEffect(() => {
    const fetchTagsAndUser = async () => {
      try {
        // Assuming this endpoint returns the current session info
        const sessionResponse = await fetch('/api/auth/session')
        const sessionData = await sessionResponse.json()

        // Check if session has user data
        if (sessionData?.user) {
          const userTags = [
            sessionData.user.user_tags1,
            sessionData.user.user_tags2,
            sessionData.user.user_tags3,
          ].filter((tag) => tag)

          setSelectedTags(userTags)
        }
        if (status === 'loading') {
          return <div>Loading...</div>
        }

        const response = await fetch(`/api/tags/getTags/${sessionData.user.id}`)
        const data = await response.json()

        if (data.tags) {
          setAllTags(data.tags)
        } else {
          console.error('Failed to fetch tags:', data.message)
        }
      } catch (error) {
        console.error('Error fetching tags or user:', error)
      }
    }

    if (session?.user) {
      fetchTagsAndUser()
    }
  }, [session])

  const toggleShow = () => {
    setHiddenAllTags(!hiddenalltags)
  }

  const handleTagSelection = async (tag: string) => {
    setSelectedTags((prevTags) => {
      if (prevTags.includes(tag)) {
        const updatedTags = prevTags.filter((t) => t !== tag)
        updateTagsInDB(updatedTags)
        return updatedTags
      } else if (prevTags.length < 3) {
        const updatedTags = [...prevTags, tag]
        updateTagsInDB(updatedTags)
        return updatedTags
      }
      return prevTags
    })
  }
  const updateTagsInDB = async (updatedTags: string[]) => {
    try {
      const response = await fetch('/api/tags/updateTags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tags: updatedTags }),
      })

      if (!response.ok) {
        console.error('Failed to update tags:', await response.json())
      }
    } catch (error) {
      console.error('Error updating tags:', error)
    }
  }
  return (
    <>
      <button
        onDoubleClick={() => setHiddenAllTags(!hiddenalltags)}
        type="button"
        className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
      >
        <svg
          className="w-5 h-5 me-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15.2 6H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11.2a1 1 0 0 0 .747-.334l4.46-5a1 1 0 0 0 0-1.332l-4.46-5A1 1 0 0 0 15.2 6Z"
          />
        </svg>
        <h2>Tags: </h2>
        <div className=" ">
          <ul className="mt-[-10px] ml-[20px] flex justify-self-center absolute *:rounded-full *:border *:border-sky-100 *:bg-sky-50 *:px-2 *:py-0.5 dark:text-sky-300 dark:*:border-sky-500/15 dark:*:bg-sky-500/10">
            {selectedTags.length > 0 ? (
              selectedTags.map((tag, index) => (
                <li key={index} className="mx-2 bg-slate-950 shadow-lg text-nowrap ml-[-4px]">
                  {tag}
                </li>
              ))
            ) : (
              <li className="text-gray-500">No tags selected</li>
            )}
          </ul>
        </div>
      </button>
      <Show
        toggleShow={toggleShow}
        hiddenalltags={hiddenalltags}
        selectedTags={selectedTags}
        handleTagSelection={handleTagSelection}
        allTags={allTags} // Pass the tags to the Show component
      />
    </>
  )
}

interface ShowProps {
  hiddenalltags: boolean
  toggleShow: () => void
  selectedTags: string[]
  handleTagSelection: (tag: string) => void
  allTags: { _id: string; Tag_Name: string }[] // All tags fetched from the server
}

export const Show = ({
  toggleShow,
  hiddenalltags,
  handleTagSelection,
  selectedTags,
  allTags,
}: ShowProps) => {
  return (
    <div
      className={`bg-gray-700 z-40 w-96 h-40 overflow-y-auto ${hiddenalltags ? 'block' : 'hidden'}`}
    >
      <button className="w-96 bg-gray-900 flex justify-items-stretch" onDoubleClick={toggleShow}>
        <p className="font-mono ml-[20px] text-white">Select your favorite tags:</p>
        <button
          className="ml-[100px] dark:hover:bg-slate-400 hover:bg-slate-950"
          onClick={toggleShow}
        >
          <svg
            className="w-6 h-6  dark:text-white text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v13m0-13 4 4m-4-4-4 4"
            />
          </svg>
        </button>
      </button>
      <div className="p-4">
        {/* Display tags dynamically */}
        <div className="space-y-2">
          {allTags.map((tag) => (
            <div key={tag._id} className="flex items-center">
              <input
                type="checkbox"
                id={`tag-${tag._id}`}
                className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 rounded focus:ring-blue-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                checked={selectedTags.includes(tag.Tag_Name)}
                onChange={() => handleTagSelection(tag.Tag_Name)}
              />
              <label htmlFor={`tag-${tag._id}`} className="text-white ml-[40px]">
                {tag.Tag_Name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tags
