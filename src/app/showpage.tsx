import Carousel from './components/carousel'
import Rankings from './components/rankings'

const slides = [
  {
    Id: 1,
    Title: 'React JS',
    ingredients: 'Tổng Hợp Thư Viện Tích Hợp',
    photoName: '/images/banner1.png',
  },
  {
    Id: 2,
    Title: 'Python',
    ingredients: 'Bread with italian olive oil and rosemary',
    photoName: '/images/banner2.png',
  },
  {
    Id: 3,
    Title: 'Focaccia',
    ingredients: 'Bread with italian olive oil and rosemary',
    photoName: '/images/banner3.png',
  },
]
const rating = [
  {
    Id: 1,
    Name: 'React JS',
    trendingArticles: 'Tổng Hợp Thư Viện Tích Hợp',
    Avatar: '/images/banner1.png',
  },
  {
    Id: 2,
    Title: 'Python',
    trendingArticles: 'Bread with italian olive oil and rosemary',
    Avatar: '/images/banner2.png',
  },
  {
    Id: 3,
    Title: 'Focaccia',
    trendingArticles: 'Bread with italian olive oil and rosemary',
    Avatar: '/images/banner3.png',
  },
]

export default function ShowPage() {
  return (
    <div className="items-center">
      <Carousel slides={slides} />
      <div className="  relative w-full text-center top-10 border-double border-4 border-[#111827]">
        Accredited library collection
      </div>
      <div className="relative w-full  top-16">
        <Rankings rating={rating} />
      </div>
    </div>
  )
}
