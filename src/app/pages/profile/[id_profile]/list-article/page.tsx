'use client'
import TopMenu from '@/app/_components/navmenu'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
interface Article {
  _id: string
  Title: string
  Content: string
  Label: string
  Tag: string
  Date: string
}
const ListArticleView = () => {
  const { data: session } = useSession()
  const [articles, setArticles] = useState<Article[]>([])
  const [selectedArticles, setSelectedArticles] = useState<Set<string>>(new Set())
  // Fetch all articles of the user
  useEffect(() => {
    if (session?.user?.id) {
      fetch(`/api/Article/getAndEditRepos`)
        .then((response) => response.json())
        .then((data) => setArticles(data.repos))
        .catch((error) => console.error('Error fetching articles:', error))
    }
  }, [session?.user?.id])

  //lien quan den checkbox xóa
  const handleSelectAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedArticles(new Set(articles.map((article) => article._id)))
    } else {
      setSelectedArticles(new Set())
    }
  }
  //lien quan den checkbox xóa
  const handleCheckboxChange = (articleId: string) => {
    setSelectedArticles((prevSelected) => {
      const newSelected = new Set(prevSelected)
      if (newSelected.has(articleId)) {
        newSelected.delete(articleId)
      } else {
        newSelected.add(articleId)
      }
      return newSelected
    })
  }

  const handleDelete = async (repoId: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this article?')
    if (confirmDelete) {
      try {
        const response = await fetch('/api/Article/getAndEditRepos', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ repoId }),
        })
        const data = await response.json()
        if (response.ok) {
          setArticles((prev) => prev.filter((article) => article._id !== repoId))
          alert(data.message)
        } else {
          alert(data.message || 'Failed to delete article')
        }
      } catch (error) {
        console.error('Error deleting article:', error)
        alert('Error deleting article')
      }
    }
  }

  // Function to handle updating an article (edit)
  const handleEdit = async (repoId: string) => {
    const title = prompt('Enter new title:')
    const content = prompt('Enter new content:')
    if (title && content) {
      try {
        const response = await fetch('/api/Article/getAndEditRepos', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            repoId,
            updates: { Title: title, Content: content },
          }),
        })
        const data = await response.json()
        if (response.ok) {
          setArticles((prev) =>
            prev.map((article) =>
              article._id === repoId ? { ...article, Title: title, Content: content } : article,
            ),
          )
          alert(data.message)
        } else {
          alert(data.message || 'Failed to update article')
        }
      } catch (error) {
        console.error('Error updating article:', error)
        alert('Error updating article')
      }
    }
  }
  return (
    <div>
      <TopMenu />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-[32px] mt-[32px]">
        <div className="pb-4 bg-white dark:bg-gray-900 pl-[14px] pt-[15px] ">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>

          <div className="relative mt-1">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className=" pb-[5px] block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search htmlFor items"
            />
          </div>
          <div className="justify-self-end mr-[100px]">2</div>
        </div>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={handleSelectAllChange}
                    checked={selectedArticles.size === articles.length}
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Content
              </th>
              <th scope="col" className="px-6 py-3">
                Label
              </th>
              <th scope="col" className="px-6 py-3">
                Tag
              </th>
              <th scope="col" className="px-6 py-3">
                Date/Time
              </th>
              <th scope="col" className="px-10 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {articles.length > 0 ? (
              articles.map((article, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        checked={selectedArticles.has(article._id)}
                        onChange={() => handleCheckboxChange(article._id)}
                      />
                      <label htmlFor="checkbox-table-search-1" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <Image
                      className=" w-auto h-[50px] "
                      src="/assets/images/demobanner.avif"
                      width={120}
                      height={50}
                      alt="Flowbite Logo"
                    />
                  </th>
                  <td className="px-6 py-4">{article.Title}</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {article.Content.split(' ').slice(0, 3).join(' ')}
                    {article.Content.split(' ').length > 3 ? '...' : ''}
                  </th>
                  <td className="px-6 py-4">Video</td>
                  <td className="px-6 py-4">Developer</td>
                  <td className="px-6 py-4">14/10/2004</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEdit(article._id)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Faster Edit
                    </button>
                    <span className="mx-[20px]">/</span>
                    <Link
                      href={`/pages/profile/${session?.user.id}/list-article/custom`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(article._id)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-[32px]"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center px-6 py-4">
                  No articles available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListArticleView
