'use'
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
    Name: 'Adam',
    trendingArticles: 'Tổng Hợp Thư Viện Tích Hợp',
    Avatar: '/images/avatar2.avif',
<<<<<<< HEAD
    Label: false,
=======
    Label: true,
>>>>>>> 5a1b86e (save)
  },
  {
    Id: 2,
    Name: 'Peter',
    trendingArticles: 'Bread with italian olive oil and rosemary',
    Avatar: '/images/avatar2.avif',
<<<<<<< HEAD
    Label: true,
=======
    Label: false,
>>>>>>> 5a1b86e (save)
  },
  {
    Id: 3,
    Name: 'Focaccia',
    trendingArticles: 'Bread with italian olive oil and rosemary',
    Avatar: '/images/avatar3.avif',
    Label: false,
  },
  {
    Id: 4,
    Name: 'Focaccia',
    trendingArticles: 'Bread with italian olive oil and rosemary',
    Avatar: '/images/avatar4.avif',
    Label: false,
  },
  {
    Id: 5,
    Name: 'Focaccia',
    trendingArticles: 'Bread with italian olive oil and rosemary',
    Avatar: '/images/avatar4.avif',
    Label: false,
  },

  {
    Id: 6,
    Name: 'Focaccia',
    trendingArticles: 'Bread with italian olive oil and rosemary',
    Avatar: '/images/avatar4.avif',
    Label: false,
  },
  {
    Id: 7,
    Name: 'Focaccia',
    trendingArticles: 'Bread with italian olive oil and rosemary',
    Avatar: '/images/avatar4.avif',
    Label: false,
  },
  {
    Id: 8,
    Name: 'Focaccia',
    trendingArticles: 'Bread with italian olive oil and rosemary',
    Avatar: '/images/avatar4.avif',
    Label: false,
  },
  {
    Id: 9,
    Name: 'Focaccia',
    trendingArticles: 'Bread with italian olive oil and rosemary',
    Avatar: '/images/avatar4.avif',
    Label: false,
  },
  {
    Id: 10,
    Name: 'Focaccia',
    trendingArticles: 'Bread with italian olive oil and rosemary',
    Avatar: '/images/avatar4.avif',
    Label: false,
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
