import { Footer } from '../_components/footer'
import TopMenu from '../_components/navmenu'
import ShowPage from '../showpage'
export default function Home() {
  return (
    <div className=" font-[family-name:var(--font-geist-sans)] bg-white dark:bg-black">
      <header className="z-[1000] relative">
        <TopMenu />
      </header>
      <main className="">
        <ShowPage />
      </main>
      <footer className=" mt-[120px] row-start-3 flex gap-6 flex-wrap items-center justify-center bg-white dark:bg-gray-900">
        <Footer />
      </footer>
    </div>
  )
}
