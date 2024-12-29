import TopMenu from '@/app/_components/navmenu'
import { connectDB } from 'config/mongodb'
// Update the import to refer to your MongoDB User model
import User from 'models/User'
import { ObjectId } from 'mongoose'

import { MenuProfile } from '../_components/menu-profile'
import Tags from '../_components/selected-tags'
import { MenuMini } from '../_components/selected-avatar'

import ArticleList from '../_components/card'

const SettingsProfile = async ({ params }: { params: { id_profile: ObjectId } }) => {
  try {
    // Ensure DB is connected before querying
    await connectDB()

    // Query the user by ID from the correct model
    const selectedUser = await User.findOne({ _id: params.id_profile })

    if (!selectedUser) {
      return <div className="p-4">2</div>
    }

    return (
      <div className="bg-gray-950 text-black justify-items-stretch ">
        <TopMenu />
        <div className="justify-self-center w-full max-w-7xl pb-4  pt-4">
          <div className=" h-auto pb-4  rounded-lg shadow bg-white border-gray-200 dark:bg-gray-900  ">
            <MenuProfile />
            <div className="flex flex-col items-center pb-10 ml-[15px] mr-[15px]  ">
              <MenuMini
                selectedUser={{ image: selectedUser.image, id: selectedUser._id.toString() }}
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {selectedUser.name}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {selectedUser.description}
              </span>
              <div className="flex mt-4 md:mt-6">
                <a
                  href="#"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add friend
                </a>
                <a
                  href="#"
                  className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Message
                </a>
              </div>
              <div className=" mt-[20px] text-gray-900  border rounded-lg bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-600 dark:text-white">
                <button
                  type="button"
                  className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
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
                      d="m10.827 5.465-.435-2.324m.435 2.324a5.338 5.338 0 0 1 6.033 4.333l.331 1.769c.44 2.345 2.383 2.588 2.6 3.761.11.586.22 1.171-.31 1.271l-12.7 2.377c-.529.099-.639-.488-.749-1.074C5.813 16.73 7.538 15.8 7.1 13.455c-.219-1.169.218 1.162-.33-1.769a5.338 5.338 0 0 1 4.058-6.221Zm-7.046 4.41c.143-1.877.822-3.461 2.086-4.856m2.646 13.633a3.472 3.472 0 0 0 6.728-.777l.09-.5-6.818 1.277Z"
                    />
                  </svg>
                  <h2>Follow: </h2>

                  <div className="  ">
                    <ul className=" mt-[-10px] ml-[25px] flex justify-self-center absolute">
                      <li className="font-medium leading-2 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-700 relative inline-block">
                        <p className="relative text-white">1Tr</p>
                      </li>
                    </ul>
                  </div>
                </button>
                <button
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
                      stroke-width="2"
                      d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                    />
                    <path
                      stroke="currentColor"
                      stroke-width="2"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                  <h2>View: </h2>

                  <div className="  ">
                    <ul className=" mt-[-10px] ml-[35px] flex justify-self-center absolute">
                      <li className="font-medium leading-2 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-700 relative inline-block">
                        <p className="relative text-white">1,2N</p>
                      </li>
                    </ul>
                  </div>
                </button>
                <Tags />

                <button
                  type="button"
                  className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium rounded-b-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
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
                      d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                    />
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"
                    />
                  </svg>
                  <h2>Locate: </h2>

                  <div className="  ">
                    <ul className=" mt-[-10px] ml-[20px] flex justify-self-center absolute">
                      <li className="font-medium leading-2">Viet Nam</li>
                    </ul>
                  </div>
                </button>
              </div>
            </div>
            <div className="text-white justify-between w-full px-[18px] flex flex-wrap">
              <ArticleList />
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
export default SettingsProfile
