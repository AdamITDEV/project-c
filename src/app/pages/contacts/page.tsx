import { Footer } from '@/app/_components/footer'
import TopMenu from '@/app/_components/navmenu'
import { PageContact } from './_components/contacts-view'
const Contacts = () => {
  return (
    <div className=" font-[family-name:var(--font-geist-sans)]">
      <header className="z-[1000] relative">
        <TopMenu />
      </header>
      <main>
        <PageContact />
      </main>
      <footer className=" mt-[1000px] row-start-3 flex gap-6 flex-wrap items-center justify-center bg-white dark:bg-gray-900">
        <Footer />
      </footer>
    </div>
  )
}
export default Contacts
