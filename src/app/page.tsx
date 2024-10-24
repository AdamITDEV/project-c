import NavMenu from '../app/components/navmenu'
export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <header>
        <NavMenu />
      </header>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  )
}
