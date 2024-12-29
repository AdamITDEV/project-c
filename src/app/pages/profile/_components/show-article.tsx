import { Int32 } from 'mongodb'
import Link from 'next/link'
interface ArticleProps {
  article: {
    Id_stores: Int32
    Title: string
    Content: string
    Date_time: string
    Label: string
    Id_user: string
    Total_viewer: string
    Image_content: string
  }
}

const Article = ({ article }: ArticleProps) => {
  const articleDate = new Date(article.Date_time)
  const formattedDate = articleDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
  return (
    <article className="  dark:hover:shadow-lg hover:shadow-lg  dark:hover:border-white hover:border-black   w-full  mt-[15px]  mb-[20px] max-w-xl p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-between items-center mb-5 text-gray-500">
        <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
          <svg
            className="mr-1 w-3 h-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
          </svg>
          {article.Label}
          <div className="flex items-center space-x-4">
            <span className="ml-[40px] rounded-full border-[1px] w-[10px] h-[10px] bg-[#ec4899] relative group">
              <span className="absolute hidden group-hover:block z-10 bg-black text-white text-xs rounded-md px-2 py-1 bottom-[120%] left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                Tag: #ec4899
              </span>
            </span>
            <span className="ml-[20px] rounded-full border-[1px] w-[10px] h-[10px] bg-[#f97316] relative group">
              <span className="absolute hidden group-hover:block z-10 bg-black text-white text-xs rounded-md px-2 py-1 bottom-[120%] left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                Tag: #f97316
              </span>
            </span>
            <span className="ml-[20px] rounded-full border-[1px] w-[10px] h-[10px] bg-[#a3e635] relative group">
              <span className="absolute hidden group-hover:block z-10 bg-black text-white text-xs rounded-md px-2 py-1 bottom-[120%] left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                Tag: #a3e635
              </span>
            </span>
          </div>
        </span>

        <span className="text-sm">{formattedDate}</span>
      </div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        <a href="#">{article.Title}</a>
      </h2>
      <p className="mb-5 font-light text-gray-500 dark:text-gray-400 truncate ">
        {article.Content}
      </p>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="font-medium dark:text-white">{article.Total_viewer}</span>
        </div>
        <Link
          href={`/pages/details/blog/${article.Id_stores}`}
          className="inline-flex items-center font-medium text-gray-950 dark:text-gray-50 hover:underline"
        >
          Read more
          <svg
            className="ml-2 w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </Link>
      </div>
    </article>
  )
}
export default Article
