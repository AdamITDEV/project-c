'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import { Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export interface Item {
  _id: string
  Label: string
  Image: string
  Title: string
  Content: string
  DateTime: string
  Viewer: number
  Id_Rating: number
  Id_User: number
}

interface ProposeProps {
  recommendedItems: Item[] // All recommended items
  onSlideChange: (index: number) => void
}

export const Propose: React.FC<ProposeProps> = ({ recommendedItems, onSlideChange }) => {
  const categories = ['For you', 'Followed', 'You Might Like', 'Suggestion'] as const
  type Category = (typeof categories)[number] // 'For you' | 'Followed' | 'You Might Like' | 'Suggestion'
  const truncateContent = (content: string, maxLength: number) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + '...'
  }
  const categoryIcons: Record<Category, string> = {
    'For you': '/first-new.svg',
    Followed: '/followed-icon.svg',
    'You Might Like': '/like-icon.svg',
    Suggestion: '/user-tick.svg',
  }
  const router = useRouter()
  const handleClickArticle = (Id_blog: string) => {
    // Redirect to ArticleDetail page with Id_blog as a URL parameter
    router.push(`/pages/details/blog/${Id_blog}`)
  }

  return (
    <div className="flex justify-center mt-8 relative rounded-2xl">
      <div className="w-[1080px] relative shadow-lg rounded-2xl">
        {/* Horizontal Swiper for switching categories */}
        <Swiper
          direction="horizontal"
          spaceBetween={10}
          slidesPerView={1}
          className="h-[580px] bg-white dark:bg-black shadow-lg"
          modules={[Pagination, Navigation]}
          onSlideChange={(swiper) => onSlideChange(swiper.activeIndex)}
        >
          {categories.map((category, catIndex) => (
            <SwiperSlide key={catIndex}>
              <div className="h-full">
                <div className="h-[50px] flex items-center justify-center bg-white  dark:bg-slate-950 shadow-md border-b">
                  <Image
                    src={categoryIcons[category]}
                    width={40}
                    height={40}
                    alt={category}
                    className="mr-2 rounded-md dark:bg-purple-400"
                  />
                  <span className="text-lg font-semibold text-gray-700 dark:text-white">
                    {category}
                  </span>
                </div>
                {/* Vertical Swiper inside each category */}
                <Swiper
                  direction="vertical"
                  pagination={{ clickable: true }}
                  spaceBetween={20}
                  slidesPerView={1}
                  className="h-[530px]"
                  modules={[Pagination]}
                  onSlideChange={(swiper) => onSlideChange(swiper.realIndex)}
                >
                  {recommendedItems.map((item, index) => (
                    <SwiperSlide key={index}>
                      <div
                        onClick={() => handleClickArticle(item._id)}
                        className={`h-full pt-[50px]  justify-center items-center rounded-lg shadow-md ${
                          category === 'For you'
                            ? 'bg-indigo-50 text-indigo-600 '
                            : category === 'Followed'
                            ? 'bg-green-50 text-green-600'
                            : category === 'You Might Like'
                            ? 'bg-blue-50 text-blue-600'
                            : 'bg-yellow-50 text-yellow-600'
                        }`}
                      >
                        <div className="  grid text-center">
                          <span className="text-2xl font-semibold">{item.Title}</span>
                          <span className="text-xl mt-[50px] text-gray-600 dark:text-gray-900">
                            {truncateContent(item.Content, 1000)} {/* 100 là số ký tự giới hạn */}
                          </span>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
