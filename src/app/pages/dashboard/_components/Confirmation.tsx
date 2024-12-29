'use client'

import { useState, useEffect } from 'react'

interface ConfirmProps {
  isVisible: boolean
  toggleConfirmation: () => void // Function that toggles visibility
}

export const Confirm = ({ isVisible, toggleConfirmation }: ConfirmProps) => {
  const [isAnimating, setIsAnimating] = useState(false) // Track animation state
  const [showModal, setShowModal] = useState(false) // Control modal visibility in DOM
  const [isAllChecked, setIsAllChecked] = useState(false) // Verify all checkboxes
  const [checkboxes, setCheckboxes] = useState([false, false, false, false, false, false]) // Checkbox states
  const [showSuccessDialog, setShowSuccessDialog] = useState(false) // Control the success dialog visibility

  useEffect(() => {
    if (isVisible) {
      setShowModal(true) // Add modal to DOM
      requestAnimationFrame(() => setIsAnimating(true)) // Start zoom-in animation
    } else {
      setIsAnimating(false) // Start zoom-out animation
      const timeout = setTimeout(() => setShowModal(false), 500) // Wait for animation to complete
      return () => clearTimeout(timeout)
    }
  }, [isVisible])

  // Handle checkbox changes
  const handleCheckboxChange = (index: number) => {
    const updatedCheckboxes = [...checkboxes]
    updatedCheckboxes[index] = !updatedCheckboxes[index]
    setCheckboxes(updatedCheckboxes)
    setIsAllChecked(updatedCheckboxes.every((checked) => checked)) // Check if all are ticked
  }

  const handleSubmit = async () => {
    if (isAllChecked) {
      // Assuming you are sending the request to the correct endpoint
      const response = await fetch('/api/updateStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: true }), // Send the `status` field
      })

      const data = await response.json()

      if (data.message === 'Avatar updated successfully') {
        setShowSuccessDialog(true)
      } else {
        alert(data.message || 'Something went wrong')
      }
    } else {
      alert('Please accept all the terms before proceeding.')
    }
  }

  return (
    <div>
      <div>
        {showModal && !showSuccessDialog && (
          <div
            className={`fixed inset-0 z-50 p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 ${
              isAnimating ? 'animate-zoomin' : 'animate-zoomout'
            }`}
          >
            <div className="h-screen overflow-y-auto bg-white dark:bg-gray-900">
              <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16 ">
                <div className="mx-auto max-w-2xl px-4 2xl:px-0">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-2">
                    Terms of Service
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 mb-6 md:mb-8">
                    Bạn đang gửi yêu cầu sử dụng dịch vụ lưu trữ mã dịch vụ là{' '}
                    <a
                      href="#"
                      className="font-medium text-gray-900 dark:text-white hover:underline"
                    >
                      #7564804
                    </a>{' '}
                    vui lòng đọc kỹ và xác nhận sử dụng dịch vụ của chúng tôi bên dưới.
                  </p>
                  <div className="space-y-4 sm:space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800 mb-6 md:mb-8">
                    {[
                      'Nội dung lưu trữ cá nhân',
                      'Thông tin cá nhân',
                      'Kiểm duyệt nội dung',
                      'Chia sẻ an toàn',
                      'Vấn đề vi phạm',
                      'Bạn đã đồng ý với điều khoản trên ?',
                    ].map((label, index) => (
                      <dl
                        key={index}
                        className="sm:flex items-center justify-between gap-4 px-[32px]"
                      >
                        <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
                          {label}
                        </dt>
                        <dd className="font-medium text-gray-900 dark:text-white sm:text-end flex">
                          <td className="ml-[32px]">
                            <input
                              id="checkbox-1"
                              type="checkbox"
                              value=""
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              checked={checkboxes[index]}
                              onChange={() => handleCheckboxChange(index)}
                            />
                          </td>
                        </dd>
                      </dl>
                    ))}
                  </div>
                  <div className="flex items-center space-x-4 justify-center">
                    <button
                      onClick={handleSubmit}
                      className=" py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      I accept
                    </button>
                    <button
                      onClick={toggleConfirmation}
                      className=" py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}
        {showSuccessDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div>
              {' '}
              <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                <button
                  onClick={() => {
                    setShowSuccessDialog(false)
                    toggleConfirmation()
                  }}
                  type="button"
                  className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="successModal"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Success</span>
                </div>
                <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  Successfully removed product.
                </p>
                <button
                  onClick={() => {
                    setShowSuccessDialog(false)
                    toggleConfirmation()
                  }}
                  className="py-2.5 px-5 text-sm font-medium bg-primary-600 text-white rounded-lg hover:bg-slate-500"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
