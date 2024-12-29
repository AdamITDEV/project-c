// File: src/app/pages/details/blog/[Id_blog]/page.tsx

import { connectDB } from 'config/mongodb' // MongoDB connection
import User from 'models/User'
import user_repos from 'models/User_repos' // Model for fetching repos
import mongoose from 'mongoose'
import Image from 'next/image'

const ArticleDetail = async ({ params }: { params: { Id_blog: string } }) => {
  const { Id_blog } = params

  try {
    await connectDB()
    let article
    if (mongoose.Types.ObjectId.isValid(Id_blog)) {
      // If it's a valid ObjectId, fetch using _id
      article = await user_repos.findOne({ _id: Id_blog })
    } else {
      // If it's not an ObjectId, fall back to using Id_stores (converted to int if needed)
      article = await user_repos.findOne({ Id_stores: parseInt(Id_blog) })
    }

    if (!article) {
      return <div>Article not found</div>
    }

    // Fetch user information based on Id_User
    const user = await User.findById(article.Id_User)

    if (!user) {
      return <div>User not found</div>
    }
    const articleDate = new Date(article.Date_time)
    const formattedDate = articleDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

    return (
      <>
        <main>
          <div className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
            <div className="flex justify-start px-4 mx-auto max-w-screen-xl   ">
              <Image
                className="rounded-[32px]"
                src="/images/avatar2.avif"
                width={120}
                height={100}
                alt="Flowbite Logo"
              />
              <div className="grid">
                <p className="ml-[32px] pt-[42px] text-xl font-bold text-gray-900 dark:text-white">
                  {user.name}
                </p>
                <p className="ml-[32px] text-base text-gray-500 dark:text-gray-400">
                  {article.Tags_Article1}, {article.Tags_Article2} & {article.Tags_Article3} |{' '}
                  {formattedDate}
                </p>
              </div>
            </div>
            <div className="justify-self-center  pt-[32px] mb-[-80px] h-auto">
              <h1 className="mb-4 mx-[32px] text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                {article.Title}
              </h1>
            </div>
          </div>
          <div className=" flex w-auto pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased mt-[10px] mb-[10px] border-l-[1px] border-r-[1px] border-gray-400 rounded-sm ">
            <div className="grid justify-start  mx-auto max-w-screen-xl ">
              <p className="mb-4 text-[13pt] font-medium leading-normal text-gray-900 lg:mb-6 lg:text-[13pt] dark:text-white ml-[32px]">
                {article.Content}
              </p>

              <div className="justify-items-center ">
                <Image
                  className="rounded-sm"
                  src="/assets/images/data.png"
                  width={640}
                  height={320}
                  alt=""
                />
                <p>Digital art by Anonymous</p>
              </div>
            </div>
          </div>
        </main>
      </>
    )
  } catch (error) {
    console.error('Error fetching article:', error)
    return <div>Failed to load article</div>
  }
}

export default ArticleDetail
