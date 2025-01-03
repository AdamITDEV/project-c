'use client'
import { useEffect, useState } from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'
import { GiTrophyCup } from 'react-icons/gi'
import Image from 'next/image'
import Link from 'next/link'

interface rank {
  Id_rating: number
  Name: string
  trendingArticles: string
  Avatar: string
  Label: boolean
}

interface RankingsProps {
  rating: rank[]
}

const Rankings: React.FC<RankingsProps> = ({ rating }) => {
  const [isMobile, setIsMobile] = useState(false)

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768)
  }

  useEffect(() => {
    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const topRankings = rating.filter((rank) => rank.Id_rating >= 1 && rank.Id_rating <= 5)
  const otherRankings = rating.filter((rank) => rank.Id_rating >= 6 && rank.Id_rating <= 10)

  return (
    <div
      className={`flex flex-col md:flex-row justify-around border-4 border-r-white ${
        isMobile ? 'p-20' : 'p-5'
      }`}
    >
      <div className="flex-1">
        <div className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white flex justify-center ">
            Top #1 <FaArrowRightLong className="mx-3 mt-1" /> #5
          </h5>
          <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Ranking based on members contributing the most during the week, members with the most
            views, trending, and high value.
          </p>
          <ul className="my-4 space-y-5">
            {topRankings.map((rating) => (
              <div key={rating.Id_rating}>
                <li className="w-full">
                  <Link
                    href={`/pages/details/${rating.Id_rating}`}
                    className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                  >
                    <span className=" ">
                      <Image
                        className={`flex rounded-sm ${isMobile ? 'w-32' : 'w-16'}`}
                        src={rating.Avatar}
                        alt={rating.Name}
                        width={320}
                        height={120}
                      />
                    </span>
                    <span className="flex-1 ms-3 whitespace-nowrap">{rating.Name}</span>
                    <span className="px-1 py-0.5 ms-2 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">
                      {rating.Label ? ' Master' : ' '}
                    </span>
                  </Link>
                </li>
              </div>
            ))}
          </ul>
          <div>
            <a
              href="#"
              className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400"
            >
              <svg
                className="w-3 h-3 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Why do I need to connect with my wallet?
            </a>
          </div>
        </div>
      </div>
      <div className={`mx-52 ${isMobile ? `hidden` : `block`} `}>
        <div className="place-items-center">
          {!isMobile && (
            <p className="text-yellow-300 flex p-5 ">
              The top 10 winners...
              <GiTrophyCup className="text-yellow-300" />
            </p>
          )}
        </div>

        <div>
          {!isMobile && (
            <iframe
              className={`${isMobile ? `w-[20rem] h-[15rem]` : `w-[30rem] h-[25rem]`}`}
              src="https://www.youtube.com/embed/W2EmxaQkafY?si=0DXv9ScCUkJK0449"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          )}
        </div>
      </div>
      <div className="flex-1">
        <div className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white flex justify-center ">
            Top #5 <FaArrowRightLong className="mx-3 mt-1" /> #10
          </h5>

          <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Ranking based on members contributing the most during the week, members with the most
            views, trending, and high value.
          </p>
          <ul className="my-4 space-y-5">
            {otherRankings.map((rating) => (
              <div key={rating.Id_rating}>
                <li className="w-full">
                  <Link
                    href={`/pages/details/${rating.Id_rating}`}
                    className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                  >
                    <span className=" ">
                      <Image
                        className={`flex rounded-sm ${isMobile ? 'w-32' : 'w-16'}`}
                        src={rating.Avatar}
                        alt={rating.Name}
                        width={320}
                        height={120}
                      />
                    </span>
                    <span className="flex-1 ms-3 whitespace-nowrap">{rating.Name}</span>
                    <span className="px-1 py-0.5 ms-2 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">
                      {rating.Label ? ' Master' : ' '}
                    </span>
                  </Link>
                </li>
              </div>
            ))}
          </ul>
          <div>
            <a
              href="#"
              className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400"
            >
              <svg
                className="w-3 h-3 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Why do I need to connect with my wallet?
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Rankings
