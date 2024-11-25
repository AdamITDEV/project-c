'use client'
import Carousel from './_components/carousel'
import Rankings from './_components/rankings'
import { slides, userStorage } from '../../_constants/data'
import { rating } from '../../_constants/data'
import { Item, Propose } from './_components/propose'
import { useEffect, useState } from 'react'
export default function ShowPage() {
  const [recommendedItems, setRecommendedItems] = useState<Item[]>([])

  const fetchRecommendedItems = () => {
    const data = userStorage.filter((item) => Number(item.Viewer) > 4)
    setRecommendedItems(data)
  }

  useEffect(() => {
    fetchRecommendedItems()
  }, [])

  const handleSlideChange = (index: number) => {
    if (index === 0 || index === userStorage.length - 1) {
      console.log('Reached first or last item, reloading data...')
      fetchRecommendedItems()
    }
  }

  return (
    <div className="items-center">
      <Carousel slides={slides} />
      <div className="relative w-full text-center top-10 border-double border-4 border-[#111827]">
        Accredited library collection
      </div>
      <div className="relative w-full top-16">
        <Rankings rating={rating} />
        <Propose recommendedItems={recommendedItems} onSlideChange={handleSlideChange} />
      </div>
    </div>
  )
}
