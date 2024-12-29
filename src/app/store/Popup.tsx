'use client'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store'
import { hidePopup } from './store'

export default function Popup() {
  const dispatch = useDispatch()
  const visible = useSelector((state: RootState) => state.popup.visible)

  if (!visible) return null

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md text-center">
        <p className="mb-4 dark:bg-black">Welcome to our site!</p>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => dispatch(hidePopup())}
        >
          Close
        </button>
      </div>
    </div>
  )
}
