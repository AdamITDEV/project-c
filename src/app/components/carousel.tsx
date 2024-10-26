'use client'
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

interface Slide {
  Id: number
  Title: string
  ingredients: string
  photoName: string
}

interface CarouselProps {
  slides: Slide[]
}

const Carousel: React.FC<CarouselProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const handleNext = useCallback(() => {
    setCurrentIndex((prevIn) => (prevIn + 1) % slides.length)
  }, [slides.length])

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIn) => (prevIn - 1) % slides.length)
  }, [slides.length])

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext()
      handlePrev()
    }, 4000)

    return () => clearInterval(interval)
  }, [handleNext, handlePrev])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    if (touchStart - touchEnd > 50) handleNext() // Swipe left
    if (touchStart - touchEnd < -50) handlePrev() // Swipe right
    setTouchStart(null)
    setTouchEnd(null)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div>
      <div
        id="controls-carousel"
        className="relative w-full overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.Id} className="flex-shrink-0 w-full h-56 md:h-96 relative">
              <Image
                src={slide.photoName}
                alt={slide.Title}
                width={500}
                height={300}
                className="absolute block -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 border-2 border-blue-950 rounded-lg"
              />
              <h2 className="absolute block bg-black w-28 text-center text-white rounded-md -translate-x-1/2 -translate-y-1/2 mt- top-11 left-1/2">
                {slide.Title}
              </h2>
              <p className="absolute block -translate-x-1/2 -translate-y-1/2 mt-20 top-1/2 left-1/2">
                {slide.ingredients}
              </p>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handlePrev}
          className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-prev
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-blue-950 group-focus:outline-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>

        <button
          type="button"
          onClick={handleNext}
          className=" absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-next
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-gray-900 group-focus:outline-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 9l4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>

      <div className="flex justify-center mt-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 mx-1 rounded-full ${
              index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default Carousel
