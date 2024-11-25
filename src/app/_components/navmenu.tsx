'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { XMarkIcon } from '@heroicons/react/20/solid'

import { FaMoon } from 'react-icons/fa'
import { BsSunFill } from 'react-icons/bs'
import { navmenu } from '../../../_constants/data'
import { signOut } from 'next-auth/react'

export default function TopMenu() {
  const [isClient, setIsClient] = useState(false)
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isOpenAvatar, setIsOpenAvatar] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [userSession, setUserSession] = useState({ name: ' ', email: '' })
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch('/api/auth/session')
        if (!res.ok) throw new Error('Failed to fetch session')
        const data = await res.json()
        setUserSession({
          name: data.user?.name || 'Unknown User',
          email: data.user?.email || 'unknown@example.com',
        })
      } catch (error) {
        console.error('Error fetching session:', error)
      }
    }
    fetchSession()
  }, [])

  useEffect(() => {
    setIsClient(true)
  }, [])
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

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen)
    if (!isNavOpen) setIsOpenAvatar(false)
  }

  const toggleNavAvatar = () => {
    setIsOpenAvatar(!isOpenAvatar)
    if (!isOpenAvatar) setIsNavOpen(false)
  }

  const [isMobile, setIsMobile] = useState(false)

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768)
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      {isClient && (
        <>
          <Banners />
          <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
              <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                <Image
                  src="/assets/images/logo-index.png"
                  width={50}
                  height={50}
                  alt="Flowbite Logo"
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  IT DEV Library
                </span>
              </a>
              <div className="flex  items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <button
                  onClick={() => {
                    if (!userSession || !userSession.name) {
                      // Redirect to the login page
                      window.location.href = 'pages/login'
                    } else {
                      toggleNavAvatar()
                    }
                  }}
                  type="button"
                  className="  flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  id="user-menu-button"
                  aria-expanded={isOpenAvatar}
                  data-dropdown-toggle="user-dropdown"
                  data-dropdown-placement="bottom"
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <Image
                    className="w-8 h-8 rounded-full "
                    src="/assets/images/avatar.png"
                    width={100}
                    height={100}
                    alt="Flowbite Logo"
                  />
                </button>

                <div
                  className={`absolute right-28 mt-80 w-48 origin-top-right bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 ${
                    isOpenAvatar ? 'block' : 'hidden '
                  }`}
                  id="user-dropdown"
                >
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">
                      {userSession.name}
                    </span>
                    <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                      {userSession.email}
                    </span>
                    <span className="block text-sm  ">
                      <label className="inline-flex items-center me-5 cursor-pointer h-10">
                        <input type="checkbox" value="" className="sr-only peer" id="checked" />
                        <div
                          onClick={() => setDarkMode(!darkMode)}
                          className=" flex justify-start relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-slate-300 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-blue-950 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-700"
                        >
                          <FaMoon className="h-6 ml-1 text-yellow-500" />

                          <BsSunFill className="h-6 ml-2 text-red-700" />
                        </div>
                      </label>
                    </span>
                  </div>

                  {userSession.name && userSession.name !== 'Unknown User' ? (
                    <ul className="py-2 " aria-labelledby="user-menu-button">
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Dashboard
                        </a>
                      </li>

                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Settings
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Earnings
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          onClick={() => signOut({ callbackUrl: '/Home' })}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Sign out
                        </a>
                      </li>
                    </ul>
                  ) : (
                    <ul className="py-2" aria-labelledby="user-menu-button">
                      <li>
                        <a
                          href="/pages/login"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Sign in
                        </a>
                      </li>
                    </ul>
                  )}
                </div>
                <button
                  onClick={toggleNav}
                  type="button"
                  className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  aria-controls="navbar-user"
                  aria-expanded={isNavOpen}
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 1h15M1 7h15M1 13h15"
                    />
                  </svg>
                </button>
              </div>
              <div
                className={`items-center justify-between ${isNavOpen ? 'block' : 'hidden '}
             w-full md:flex md:w-auto md:order-1 `}
                id="navbar-user"
              >
                <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                  {navmenu.map((item) => (
                    <li key={item.Id} className="relative group ">
                      {/* Mục chính */}
                      <a
                        href={item.Url || '#'}
                        className="block py-2 px-3 text-gray-700 hover:text-blue-700  dark:text-gray-200 dark:hover:text-blue-500 dark:focus:text-blue-400"
                      >
                        {item.Name}
                      </a>
                      {/* Menu sổ xuống nếu có Item1, Item2, Item3 */}
                      {(item.Item1 || item.Item2 || item.Item3) && (
                        <ul
                          className={` ${
                            isMobile ? 'relative ' : 'absolute'
                          }  hidden group-hover:block bg-white dark:bg-gray-800 shadow-lg rounded-lg`}
                        >
                          {item.Item1 && (
                            <li>
                              <a
                                href={item.UrlItem1 || '#'}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 hover:rounded-t-lg "
                              >
                                {item.Item1}
                              </a>
                            </li>
                          )}
                          {item.Item2 && (
                            <li>
                              <a
                                href={item.UrlItem2 || '#'}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
                              >
                                {item.Item2}
                              </a>
                            </li>
                          )}
                          {item.Item3 && (
                            <li>
                              <a
                                href={item.UrlItem3 || '#'}
                                className="  hover:rounded-b-lg block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
                              >
                                {item.Item3}
                              </a>
                            </li>
                          )}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  )
}
function Banners() {
  const [removeBanners, SetRemoveBanners] = useState(true)

  const handleRemove = () => {
    SetRemoveBanners(!removeBanners)
  }
  return (
    <div>
      <div
        className={`${
          removeBanners ? 'block' : 'hidden'
        } relative isolate  flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1 `}
      >
        <div
          aria-hidden="true"
          className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        >
          <div
            style={{
              clipPath:
                'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
            }}
            className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        >
          <div
            style={{
              clipPath:
                'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
            }}
            className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
          />
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="text-sm leading-6 text-gray-900">
            <strong className="font-semibold">Happy New Year 2024</strong>
            <svg
              viewBox="0 0 2 2"
              aria-hidden="true"
              className="mx-2 inline h-0.5 w-0.5 fill-current"
            >
              <circle r={1} cx={1} cy={1} />
            </svg>
            Join us in IT DEV LIBRARY see what&apos;s coming next.
          </p>

          <a
            href="/pages/register"
            className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            Register now <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
        <div className="flex flex-1 justify-end">
          <button
            onClick={handleRemove}
            type="button"
            className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
            aria-expanded={removeBanners}
          >
            <span className="sr-only">Dismiss</span>
            <XMarkIcon aria-hidden="true" className="h-5 w-5 text-gray-900" />
          </button>
        </div>
      </div>
    </div>
  )
}
