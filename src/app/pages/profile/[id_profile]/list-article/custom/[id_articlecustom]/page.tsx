'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Image } from '@tiptap/extension-image'
import { TextAlign } from '@tiptap/extension-text-align'
import { useState } from 'react'
import { ToolbarTipTap } from '../_components/toolbar'
import TopMenu from '@/app/_components/navmenu'
import React from 'react'

const Tiptap = () => {
  const [showContextMenu, setShowContextMenu] = useState(false)
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 })
  const [selectedImage, setSelectedImage] = useState<HTMLElement | null>(null)

  const titleEditor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class:
          'prose prose-lg font-bold p-4 border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500',
      },
    },
    content: '<h1>Tiêu Đề Chính</h1>',
  })

  const content = useEditor({
    extensions: [StarterKit, Image, TextAlign.configure({ types: ['paragraph'] })],
    editorProps: {
      attributes: {
        class:
          'h-full prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 p-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500',
      },
    },
    content: '<p> Tiêu Đề Chính <br/> Cộng Hòa Xã Hội Chủ Nghĩa Việt Nam</p>',
  })

  // Function to generate a random image URL (simulated upload)
  const generateRandomImageUrl = () => {
    const randomImages = [
      'https://picsum.photos/600/400?random=1',
      'https://picsum.photos/600/400?random=2',
      'https://picsum.photos/600/400?random=3',
      'https://picsum.photos/600/400?random=4',
    ]
    return randomImages[Math.floor(Math.random() * randomImages.length)]
  }

  // Insert a random image at the current cursor position
  const insertRandomImage = () => {
    const imageUrl = generateRandomImageUrl()

    if (content) {
      content.chain().focus().setImage({ src: imageUrl }).run()
    }
  }

  // Show the context menu when right-clicking inside the editor
  const handleRightClick = (event: React.MouseEvent) => {
    event.preventDefault() // Prevent default right-click menu
    setShowContextMenu(true)
    setContextMenuPosition({ x: event.clientX, y: event.clientY })
  }

  // Hide the context menu when clicking outside
  const handleClickOutside = () => {
    setShowContextMenu(false)
  }

  // Attach event listener to detect clicks outside the context menu
  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const setTextAlignment = (alignment: 'left' | 'center' | 'right') => {
    content?.chain().focus().setTextAlign(alignment).run()
  }

  // Function to change image alignment (only affects selected image)
  const setImageAlignment = (alignment: 'left' | 'center') => {
    if (selectedImage) {
      selectedImage.style.display = 'block'
      if (alignment === 'center') {
        selectedImage.style.margin = '0 auto'
      } else {
        selectedImage.style.margin = alignment === 'left' ? '0' : '0 auto 0 0'
      }
    }
  }

  // Handle image click to select it
  const handleImageClick = (event: React.MouseEvent<HTMLElement>) => {
    const image = event.target as HTMLElement
    setSelectedImage(image)
    image.style.cursor = 'move'
  }

  return (
    <div>
      <TopMenu />
      <div className="fixed z-50 ">
        {' '}
        <ToolbarTipTap setAlignment={setImageAlignment} setTextAlignment={setTextAlignment} />
      </div>

      <div className="mb-6">
        {/* Render title editor only if it's initialized */}
        {titleEditor && <EditorContent editor={titleEditor} />}
      </div>
      <div className="relative" onContextMenu={handleRightClick}>
        {/* Render content editor only if it's initialized */}
        {content && (
          <EditorContent
            editor={content}
            onClick={(e) => {
              if (e.target instanceof HTMLImageElement) {
                handleImageClick(e)
              }
            }}
          />
        )}
        {showContextMenu && (
          <div
            className="absolute z-10 bg-white border shadow-lg rounded p-2"
            style={{ left: `${contextMenuPosition.x}px`, top: `${contextMenuPosition.y}px` }}
          >
            <button onClick={insertRandomImage} className="text-blue-500">
              Insert Random Image
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Tiptap
