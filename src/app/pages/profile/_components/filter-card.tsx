'use client'
import { useState } from 'react'

export const Filter = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false) // State for toggling filter
  const toggleFilterVisibility = () => {
    setIsFilterVisible((prev) => !prev) // Toggle visibility
  }
  return (
    <div>
      {' '}
      <div className="items-center justify-center p-4">
        <button
          onClick={toggleFilterVisibility}
          id="dropdownDefault"
          data-dropdown-toggle="dropdown"
          className="dark:text-white text-black bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          type="button"
        >
          Filter by category
          <svg
            className="w-4 h-4 ml-2"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>
        {isFilterVisible && (
          <div
            id="dropdown"
            className="z-50 mt-[20px] w-56 p-3 bg-white rounded-lg border-[1px] dark:bg-gray-700 absolute shadow-2xl "
          >
            <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">Category</h6>
            <ul className="space-y-2 text-sm" aria-labelledby="dropdownDefault">
              <li className="flex items-center">
                <input
                  id="apple"
                  type="checkbox"
                  value=""
                  className="  w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <span className="ml-[10px] rounded-full border-[1px] w-[10px] h-[10px] bg-[#84cc16]"></span>
                <label
                  htmlFor="apple"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  Apple (56)
                </label>
              </li>

              <li className="flex items-center">
                <input
                  id="fitbit"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <span className="ml-[10px] rounded-full border-[1px] w-[10px] h-[10px] bg-[#ec4899]"></span>
                <label
                  htmlFor="fitbit"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  Fitbit (56)
                </label>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
