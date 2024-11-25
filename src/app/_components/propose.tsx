import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { Navigation } from 'swiper/modules'
import 'swiper/css/navigation'
import Image from 'next/image'

// Define Item interface
export interface Item {
  Id_Storage: number
  Label: string
  Image: string
  Title: string
  Content: string
  DateTime: string
  Viewer: number
  Id_Rating: number
  Id_User: number
}

// Props for the component
interface ProposeProps {
  recommendedItems: Item[] // All recommended items
  onSlideChange: (index: number) => void
}

// Main component
export const Propose: React.FC<ProposeProps> = ({ recommendedItems, onSlideChange }) => {
  // State to track the selected category
  const [selectedCategory, setSelectedCategory] = useState('For you') // Default category

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category) // Update selected category
  }

  // Icons corresponding to the categories
  const categoryIcons = {
    'For you': '/first-new.svg',
    Followed: '/followed-icon.svg', // Change these to the actual icon paths
    'You Might Like': '/like-icon.svg',
    Suggestion: '/user-tick.svg',
  }

  return (
    <div className="flex justify-center mt-8 relative rounded-2xl  ">
      <div className="w-[1080px] relative  shadow-lg rounded-2xl ">
        {/* Conditionally render the Swiper for 'For you' */}
        {selectedCategory === 'For you' && (
          <Swiper
            direction="vertical"
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1}
            className="h-[580px] z-10"
            modules={[Pagination]}
            onSlideChange={(swiper) => onSlideChange(swiper.realIndex)}
          >
            {recommendedItems.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="bg-indigo-50 dark:bg-gray-900 h-full flex justify-center items-center shadow-lg  ">
                  <span className="text-3xl font-semibold text-indigo-600">{item.Title}</span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Conditionally render the Swiper for 'Followed' */}
        {selectedCategory === 'Followed' && (
          <Swiper
            direction="vertical"
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1}
            className="h-[580px] z-10"
            modules={[Pagination]}
            onSlideChange={(swiper) => onSlideChange(swiper.realIndex)}
          >
            {recommendedItems.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="bg-green-50 dark:bg-gray-900 rounded-2xl h-full flex justify-center items-center">
                  <span className="text-3xl font-semibold text-green-600">{item.Title}</span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Conditionally render the Swiper for 'You Might Like' */}
        {selectedCategory === 'You Might Like' && (
          <Swiper
            direction="vertical"
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1}
            className="h-[580px] z-10"
            modules={[Pagination]}
            onSlideChange={(swiper) => onSlideChange(swiper.realIndex)}
          >
            {recommendedItems.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="bg-blue-50 dark:bg-gray-900 rounded-2xl h-full flex justify-center items-center">
                  <span className="text-3xl font-semibold text-blue-600">{item.Title}</span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Conditionally render the Swiper for 'Suggestion On Request' */}
        {selectedCategory === 'Suggestion' && (
          <Swiper
            direction="vertical"
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1}
            className="h-[580px] z-10"
            modules={[Pagination]}
            onSlideChange={(swiper) => onSlideChange(swiper.realIndex)}
          >
            {recommendedItems.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="bg-yellow-50 dark:bg-gray-900 rounded-2xl h-full flex justify-center items-center">
                  <span className="text-3xl font-semibold text-yellow-600">{item.Title}</span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Horizontal Swiper overlay */}
        <div className="absolute top-0 left-0 w-full z-20 pointer-events-none">
          <Swiper
            spaceBetween={10}
            slidesPerView={3}
            className="h-[50px] bg-white dark:bg-black  shadow-lg"
            modules={[Navigation]}
          >
            {[
              { Label: 'For you', Icon: categoryIcons['For you'] },
              { Label: 'Followed', Icon: categoryIcons['Followed'] },
              { Label: 'You Might Like', Icon: categoryIcons['You Might Like'] },
              { Label: 'Suggestion', Icon: categoryIcons['Suggestion'] },
            ].map((item, index) => (
              <SwiperSlide
                key={index}
                className="pointer-events-auto"
                onClick={() => {
                  handleCategoryChange(item.Label) // Change the selected category
                  onSlideChange(index) // Optionally synchronize slide change
                }}
              >
                <div className="bg-white dark:bg-slate-950 border rounded-md h-full flex justify-center items-center cursor-pointer">
                  <span className="text-lg font-medium text-red-500">
                    <Image
                      className="dark:bg-white rounded-[12px] border-[1px]"
                      src={item.Icon}
                      width={40}
                      height={40}
                      alt={item.Label}
                    />
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}
