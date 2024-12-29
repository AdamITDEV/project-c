'use client'
import { useEffect, useState } from 'react'
import { FaMoon } from 'react-icons/fa'
import { BsSunFill } from 'react-icons/bs'

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const theme = localStorage.getItem('theme')
    if (theme === 'dark') setDarkMode(true)
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  const toggleDarkMode = () => setDarkMode(!darkMode)

  return (
    <div className="flex items-center ">
      <label className="inline-flex items-center cursor-pointer h-10">
        <input type="checkbox" className="sr-only" />
        <div
          onClick={toggleDarkMode}
          className=" shadow-2xl flex justify-start relative w-11 h-6 bg-gray-200 rounded-full dark:bg-slate-300 peer focus:ring-4 focus:ring-purple-300 dark:focus:ring-blue-950 peer-checked:bg-orange-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full"
        >
          <FaMoon className={`h-6 ml-1 ${darkMode ? 'text-yellow-500' : 'text-gray-500'}`} />
          <BsSunFill className={`h-6 ml-2 ${darkMode ? 'text-gray-500' : 'text-red-700'}`} />
        </div>
      </label>
    </div>
  )
}
