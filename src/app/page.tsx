import NavMenu from '../app/components/navmenu'
import ShowPage from '../app/showpage'
export default function Home() {
  return (
    <div className=" font-[family-name:var(--font-geist-sans)]">
      <header className="z-[1000] relative">
        <NavMenu />
      </header>
      <main>
        <ShowPage />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  )
}
