import User from 'models/User'
import { connectDB } from 'config/mongodb'
import { ObjectId } from 'mongodb'

import LeftMenu from '../_components/left-navmenu'

const Dashboard = async ({ params }: { params: { id_dashboard: ObjectId } }) => {
  try {
    // Ensure DB is connected before querying
    await connectDB()

    // Query the user by ID
    const selectedUser = await User.findOne({ _id: params.id_dashboard })

    if (!selectedUser) {
      return (
        <div className="p-4">
          <h1 className="text-2xl font-semibold">User not found</h1>
        </div>
      )
    }

    return (
      <div className="p-4">
        <div className="p-4">
          <div className="p-4 sm:ml-64 ">
            {/* hiển thị xác nhận sử dụng database và dịch vụ */}
            <LeftMenu selectedUser={selectedUser} />
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                  <p className="text-2xl text-gray-400 dark:text-gray-500">
                    <svg
                      className="w-3.5 h-3.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </p>
                </div>
                <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                  <p className="text-2xl text-gray-400 dark:text-gray-500">
                    <svg
                      className="w-3.5 h-3.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </p>
                </div>
                <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                  <p className="text-2xl text-gray-400 dark:text-gray-500">
                    <svg
                      className="w-3.5 h-3.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">
                  <svg
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                  <p className="text-2xl text-gray-400 dark:text-gray-500">
                    <svg
                      className="w-3.5 h-3.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </p>
                </div>
                <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                  <p className="text-2xl text-gray-400 dark:text-gray-500">
                    <svg
                      className="w-3.5 h-3.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </p>
                </div>
                <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                  <p className="text-2xl text-gray-400 dark:text-gray-500">
                    <svg
                      className="w-3.5 h-3.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </p>
                </div>
                <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                  <p className="text-2xl text-gray-400 dark:text-gray-500">
                    <svg
                      className="w-3.5 h-3.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">
                  <svg
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                  <p className="text-2xl text-gray-400 dark:text-gray-500">
                    <svg
                      className="w-3.5 h-3.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </p>
                </div>
                <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                  <p className="text-2xl text-gray-400 dark:text-gray-500">
                    <svg
                      className="w-3.5 h-3.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </p>
                </div>
                <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                  <p className="text-2xl text-gray-400 dark:text-gray-500">
                    <svg
                      className="w-3.5 h-3.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </p>
                </div>
                <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                  <p className="text-2xl text-gray-400 dark:text-gray-500">
                    <svg
                      className="w-3.5 h-3.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error fetching user:', error)
    return (
      <div className="p-4">
        <h1 className="text-2xl font-semibold text-red-500">Error fetching user data</h1>
      </div>
    )
  }
}

export default Dashboard
