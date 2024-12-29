'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
interface MenuMiniProps {
  selectedUser?: {
    image?: string
    id?: string
  }
}

export const MenuMini: React.FC<MenuMiniProps> = ({ selectedUser }) => {
  const { data: session, status } = useSession() // Get user session
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [imageUrl, setImageUrl] = useState<string>(selectedUser?.image || '') // Default avatar

  const toggleOpenMenuMini = () => {
    setIsOpen(!isOpen)
  }

  const handleUploadStart = async (event: React.ChangeEvent<HTMLInputElement>, userId: string) => {
    if (!event.target.files || event.target.files.length === 0) return
    const file = event.target.files[0]

    // Validate file type and size
    if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
      alert('Invalid file type. Please upload an image.')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('File size exceeds the limit of 10MB')
      return
    }

    setLoading(true)

    // Create FormData and append the file
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'avatar_present') // Your Cloudinary upload preset
    formData.append('cloud_name', 'drdayddpy') // Your Cloudinary cloud name

    try {
      // Upload image to Cloudinary
      const response = await fetch('https://api.cloudinary.com/v1_1/drdayddpy/image/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      if (data.secure_url && data.public_id) {
        const uploadedImageUrl = data.secure_url // URL of the uploaded image

        // Now update the image URL in the MongoDB user document
        if (userId) {
          await fetch('/api/upload-avatar', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ imageUrl: uploadedImageUrl }),
          })

          setImageUrl(uploadedImageUrl) // Update the image in the UI
        } else {
          console.error('User not logged in')
        }
      } else {
        console.error('Failed to upload image:', data.error)
        alert('Failed to upload image')
      }
    } catch (error) {
      console.error('Error during image upload:', error)
      alert('Error during image upload')
    } finally {
      setLoading(false)
    }
  }

  // Wait until session is loaded before rendering the component
  if (status === 'loading') {
    return <p>Loading...</p>
  }

  return (
    <>
      <button
        type="button"
        onClick={toggleOpenMenuMini}
        className="hoverEffect pointer-events-auto"
        aria-expanded={isOpen}
      >
        <Image
          width={200}
          height={200}
          className="w-24 h-24 mb-3 rounded-full shadow-lg border-[4px] border-gray-900 dark:border-white dark:hover:border-red-800 noSelect"
          src={imageUrl || '/assets/images/avatar.png'}
          alt="User avatar"
        />
      </button>

      {/* Fixing the nested button issue */}
      <div
        className={`bg-white rounded-full dark:bg-slate-500 ${
          isOpen ? 'block' : 'hidden'
        } z-[-10px]}
      `}
      >
        <div className="relative px-3 mt-[-12px] rounded-t-full">
          <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-b-orange-400 dark:border-b-yellow-200 border-l-transparent border-r-transparent"></div>
        </div>
        <div className="w-auto bg-slate-500 dark:bg-slate-600 px-[10px] py-[10px] mt-[10px] rounded-lg">
          <div className="hover:bg-slate-300 w-full px-[10px] justify-items-stretch rounded-md flex">
            <label htmlFor="fileInput" className="cursor-pointer justify-self-start w-[240px] flex">
              <svg
                className="w-6 h-6 dark:text-white text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 18V8a1 1 0 0 1 1-1h1.5l1.707-1.707A1 1 0 0 1 8.914 5h6.172a1 1 0 0 1 .707.293L17.5 7H19a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z"
                />
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              <p className="px-[12px] leading-5 tracking-tighter font-semibold font-sans dark:text-white text-white">
                Choose an avatar
              </p>
            </label>

            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={(e) => handleUploadStart(e, session?.user?.id || '')}
            />
          </div>
          {loading && <p className="text-center text-white">Uploading...</p>}
        </div>
      </div>
    </>
  )
}
