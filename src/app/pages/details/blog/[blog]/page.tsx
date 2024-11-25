import Image from 'next/image'

const DetailsBlog = () => {
  return (
    <>
      <main>
        <div className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
          <div className="flex justify-start px-4 mx-auto max-w-screen-xl   ">
            <Image
              className="rounded-[32px]"
              src="/images/avatar2.avif"
              width={120}
              height={100}
              alt="Flowbite Logo"
            />
            <div className="grid">
              <p className="ml-[32px] pt-[42px] text-xl font-bold text-gray-900 dark:text-white">
                Adam
              </p>
              <p className="ml-[32px] text-base text-gray-500 dark:text-gray-400">
                Graphic Designer, educator & CEO Flowbite Feb. 8, 2022
              </p>
            </div>
          </div>
          <div className="justify-self-center  pt-[32px] mb-[-80px] h-auto">
            <h1 className="mb-4 mx-[32px] text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
              Best practices for successful prototypes
            </h1>
          </div>
        </div>
        <div className=" flex w-auto pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased mt-[10px] mb-[10px] border-l-[1px] border-r-[1px] border-gray-400 rounded-sm ">
          <div className="grid justify-start  mx-auto max-w-screen-xl ">
            <p className="mb-4 text-[13pt] font-medium leading-normal text-gray-900 lg:mb-6 lg:text-[13pt] dark:text-white ml-[32px]">
              Flowbite is an open-source library of UI components built with the utility-first
              classes from Tailwind CSS. It also includes interactive elements such as dropdowns,
              modals, datepickers.
            </p>
            <p className="mb-4 text-[13pt] font-medium leading-normal text-gray-900 lg:mb-6 lg:text-[13pt] dark:text-white ml-[32px]">
              Before going digital, you might benefit from scribbling down some ideas in a
              sketchbook. This way, you can think things through before committing to an actual
              design project.{' '}
            </p>{' '}
            <p className="mb-4 text-[13pt] font-medium leading-normal text-gray-900 lg:mb-6 lg:text-[13pt] dark:text-white ml-[32px]">
              But then I found a component library based on Tailwind CSS called Flowbite. It comes
              with the most commonly used UI components, such as buttons, navigation bars, cards,
              form elements, and more which are conveniently built with the utility classes from
              Tailwind CSS.
            </p>
            <div className="justify-items-center ">
              <Image
                className="rounded-sm"
                src="/assets/images/data.png"
                width={640}
                height={320}
                alt=""
              />
              <p>Digital art by Anonymous</p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
export default DetailsBlog
