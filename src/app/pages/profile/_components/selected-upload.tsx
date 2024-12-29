'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import * as mammoth from 'mammoth'
import { Filter } from './filter-card'

type Tag = {
  _id: string
  Tag_Name: string
}

const UploadArticle = () => {
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [isViewVisible, setIsViewVisible] = useState<boolean>(false) // New state for visibility
  const [isMobile, setIsMobile] = useState(false)
  const [docTitle, setDocTitle] = useState<string>('') // For the document title
  const [docContent, setDocContent] = useState<string>('') // For the document content
  const contentRef = useRef<HTMLDivElement | null>(null) // Ref to scrollable content
  const scrollInterval = useRef<NodeJS.Timeout | null>(null) // Ref to store interval ID
  const [hiddenalltags, setHiddenAllTags] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([]) // Store selected tags
  const [allTags, setAllTags] = useState<Tag[]>([]) // Store all tags fetched from server
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
          ].filter((tag) => tag) // Filters out any undefined or null tags

          setSelectedTags(userTags) // Set user's tags from session
        }
        if (status === 'loading') {
          return <div>Loading...</div> // Optionally show a loading spinner or message
        }

        // Fetch all available tags
        const response = await fetch(`/api/tagsArticle/getTags/${sessionData.user.id}`)
        const data = await response.json()

        if (data.tags) {
          setAllTags(data.tags) // Set all available tags
        } else {
          console.error('Failed to fetch tags:', data.message)
        }
      } catch (error) {
        console.error('Error fetching tags or user:', error)
      }
    }

    if (session?.user) {
      fetchTagsAndUser() // Fetch tags and user info when session is available
    }
  }, [session]) // Dependency on session

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768)
  }
  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploadFile(file)
    setIsUploading(true)
    setIsViewVisible(true)

    const reader = new FileReader()
    reader.onload = async (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer
      const result = await mammoth.extractRawText({ arrayBuffer })
      const paragraphs = result.value.split('\n').filter((p) => p.trim() !== '')

      const title = paragraphs[0] || 'Untitled Document'
      const content = paragraphs.slice(1).join('\n')

      setDocTitle(title)
      setDocContent(content)

      try {
        const response = await fetch('/api/Article/uploadArticle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            content,
          }),
        })

        if (!response.ok) {
          console.error('Failed to upload document:', await response.json())
        } else {
          console.log('Document uploaded successfully')
        }
      } catch (error) {
        console.error('Error during upload:', error)
      }
    }

    reader.readAsArrayBuffer(file)

    // Simulate file upload progress
    const simulateUpload = () => {
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsUploading(false)
            return 100
          }
          return prev + 10
        })
      }, 500)
    }
    simulateUpload()
  }

  const handleScroll = (direction: 'up' | 'down') => {
    // Clear any ongoing interval before starting a new one
    stopScroll()

    if (contentRef.current) {
      scrollInterval.current = setInterval(() => {
        contentRef.current!.scrollBy({
          top: direction === 'down' ? 100 : -50,
          behavior: 'smooth',
        })
      }, 50) // Adjust speed as needed
    }
  }

  const stopScroll = () => {
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current)
      scrollInterval.current = null
    }
  }
  const toggleShow = () => {
    setHiddenAllTags(!hiddenalltags)
  }

  const handleTagSelection = async (tag: string) => {
    setSelectedTags((prevTags) => {
      if (prevTags.includes(tag)) {
        // Remove tag if already selected
        const updatedTags = prevTags.filter((t) => t !== tag)
        updateTagsInDB(updatedTags)
        return updatedTags
      } else if (prevTags.length < 3) {
        // Add tag if less than 3 selected
        const updatedTags = [...prevTags, tag]
        updateTagsInDB(updatedTags)
        return updatedTags
      }
      return prevTags
    })
  }
  const updateTagsInDB = async (updatedTags: string[]) => {
    try {
      const response = await fetch('/api/tags/Article/updateTags', {
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

  const handleDeleteLatestArticle = async () => {
    try {
      const response = await fetch('/api/Article/deleteArticle', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (response.ok) {
        alert('Latest article deleted successfully!')
        console.log('Deleted article:', data.repo)
      } else {
        alert(`Error: ${data.message}`)
        console.error('Failed to delete article:', data)
      }
    } catch (error) {
      console.error('Error deleting article:', error)
      alert('Something went wrong while deleting the article.')
    }
  }

  return (
    <div className=" relative w-full  z-50 h-auto">
      <div>
        <Filter />
      </div>
      {isViewVisible && uploadFile && (
        <div>
          <div className="h-[2580px]  bg-white dark:bg-slate-950 absolute mt-[-1000px] w-full shadow-xl   ">
            <div className={` ${isMobile ? `mt-[400px]` : `mt-[500px]`}   `}>
              <div className="text-center mt-4">
                <p className="text-gray-700 dark:text-gray-300">Uploading: {uploadFile.name}</p>
                {isUploading ? (
                  <p className="text-gray-700 dark:text-gray-300">Progress: {uploadProgress}%</p>
                ) : (
                  <p className="text-green-500 dark:text-green-300">Upload Complete!</p>
                )}
              </div>

              <button
                onClick={async () => {
                  if (confirm('Are you sure you want to delete your latest article?')) {
                    await handleDeleteLatestArticle()
                    setIsViewVisible(false) // Hide the view after deletion
                  }
                }}
                className="  shadow-2xl w-[44px] h-[44px] rounded-[8px] border-[1px] border-[#D0D5DD] p-[12px] gap-[8px] bg-[#FFFFFF]"
              >
                <Image src="/arrow-left.svg" width={20} height={20} alt="" />
              </button>

              <div className="">
                <div className=" w-full">
                  <div className="justify-self-end">
                    {!isUploading && (
                      <Link href={`/pages/profile/${session?.user.id}/list-article/custom`}>
                        <button
                          onClick={() => setIsViewVisible(false)}
                          className=" shadow-2xl rounded-[8px] border-[1px] border-[#D0D5DD] p-[12px] gap-[8px] bg-[#FFFFFF]"
                        >
                          <Image src="/button-edit.svg" width={44} height={44} alt="" />
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
                <div className="bg-yellow-600 w-full pt-[32px] mt-[32px]">
                  <p className="text-center leading-[32px] pb-[32px]">{docTitle}</p>
                </div>

                <div className="bg-yellow-600 w-full pt-[32px] mt-[32px]">
                  <div className="justify-self-center ">
                    <div
                      className="rounded-t-lg bg-gray-800 w-20 border-[1px] hover:bg-slate-300 focus-within:mb-[16px] transition-all duration-300 transform hover:scale-y-125 active:pb-[32px] "
                      onMouseDown={() => handleScroll('up')}
                      onMouseUp={stopScroll}
                      onMouseLeave={stopScroll}
                    >
                      <svg
                        className="w-6 h-6 text-gray-800 dark:text-white justify-self-center"
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
                    </div>
                    <div
                      className="rounded-b-lg bg-gray-800 w-20 border-[1px] hover:bg-slate-300 focus-within:mt-[16px] transition-all duration-300 transform hover:scale-y-125 active:pt-[32px]"
                      onMouseDown={() => handleScroll('down')}
                      onMouseUp={stopScroll}
                      onMouseLeave={stopScroll}
                    >
                      <svg
                        className="w-6 h-6 text-gray-800 dark:text-white justify-self-center"
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
                          d="M12 19V5m0 14-4-4m4 4 4-4"
                        />
                      </svg>
                    </div>
                  </div>
                  <div
                    className="bg-green-500 px-[32px] mx-[32px] max-h-[600px] overflow-y-auto"
                    ref={contentRef}
                  >
                    <p className="leading-[32px] text-start">{docContent}</p>

                    <div className=" justify-items-stretch ">
                      <div className="justify-self-end">
                        {!isUploading && (
                          <button
                            onClick={() => {
                              setUploadFile(null)
                              setUploadProgress(0)
                              setIsUploading(false)
                              setDocTitle('')
                              setDocContent('')
                              setSelectedTags([])
                              setIsViewVisible(false)

                              // Reload the page
                              window.location.reload()
                            }}
                            className=" shadow-2xl w-[44px] h-[44px] rounded-[8px] border-[1px] border-[#D0D5DD] p-[12px] gap-[8px] bg-[#FFFFFF]"
                          >
                            <Image src="/arrow-narrow-right.svg" width={20} height={20} alt="" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 mt-[100px]">
              {' '}
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
                        <li
                          key={index}
                          className="mx-2 bg-slate-950 shadow-lg text-nowrap ml-[-4px]"
                        >
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
            </div>
          </div>
        </div>
      )}

      <article className=" ml-[15px] mr-[16px] justify-self-center  dark:hover:shadow-lg hover:shadow-lg  dark:hover:border-white hover:border-black w-52 mt-[15px] mb-[20px] max-w-xl p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <label className="mb-[-10] cursor-pointer dark:hover:bg-gray-900 hover:bg-slate-100 bg-slate-200 dark:bg-gray-700 w-full flex justify-between items-center  text-gray-500 border-dashed border-4 border-gray-600 h-full justify-items-stretch">
          <input
            type="file"
            accept=".doc,.docx,.mp4,.avi,.mkv"
            className="hidden"
            onChange={handleFileUpload}
          />
          <p className="text-center font-semibold justify-self-center w-full text-[100px]">+</p>
        </label>
      </article>
    </div>
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
export default UploadArticle
