'use client'
import { useState, useEffect } from 'react'
import Article from './show-article'
import UploadArticle from './selected-upload'

import { Int32 } from 'mongodb'

interface ArticleData {
  _id: string
  Id_stores: Int32
  Title: string // Changed from 'title' to 'Title'
  Content: string // Changed from 'content' to 'Content'
  Date_time: string // Changed from 'date_time' to 'Date_time'
  Label: string // Changed from 'label' to 'Label'
  Id_user: string // Changed from 'id_user' to 'Id_user'
  Image_content: string
  Total_viewer: string
}

const ArticleList = () => {
  const [articles, setArticles] = useState<ArticleData[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch('/api/getUserRepos')
        const data = await res.json()
        console.log('Fetched Data:', data) // Kiểm tra dữ liệu

        if (res.status === 403) {
          setError('Your account status is inactive. Access is denied.')
          return
        }
        if (res.status === 401) {
          setError('Unauthorized. Please login to access this resource.')
          return
        }
        if (!res.ok) {
          throw new Error('Failed to fetch articles')
        }

        if (Array.isArray(data)) {
          setArticles(data)
        } else if (data.repos && Array.isArray(data.repos)) {
          setArticles(data.repos)
        } else {
          throw new Error('Invalid data htmlFormat')
        }
      } catch (error) {
        setError('An error occurred while fetching data.')
        console.error(error)
      }
    }

    fetchArticles()
  }, [])

  if (error) {
    return <p className="text-red-500">{error}</p>
  }

  return (
    <div className="container mx-auto p-4">
      <UploadArticle />
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ml-[15px] mr-[15px]">
          {articles.map((article) => (
            <Article key={article._id} article={article} />
          ))}
        </div>
      ) : (
        <div>
          <p>No articles available</p>
        </div>
      )}
    </div>
  )
}

export default ArticleList
