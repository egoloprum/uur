import Image from 'next/image'
import Link from 'next/link'

export const AboutSection = ({}) => {
  return (
    <section className="bg-white text-black min-h-fit border-b border-black/8 pb-10 sm:pb-20 md:pb-30 lg:pb-40 overflow-x-hidden overflow-y-hidden">
      <div className="grid grid-cols-12 relative">
        <div className="col-span-2 md:col-span-4 md:border-b border-black/8 px-4 sm:px-6 md:px-8 lg:px-10"></div>
        <div className="col-span-10 md:col-span-8 border-l md:border-b border-black/8 p-4 sm:p-6 md:p-8 lg:p-10 pt-10! sm:pt-20! md:pt-30! lg:pt-40!">
          <h2 className="text-xl/8 sm:text-xl/10 md:text-3xl/12 lg:text-5xl/14 italic">
            Our science, technology, and art knowledge booklet. Let's explain science, technology,
            and art ideas in Mongolian in a simple way for everyone. Let's build a nest of knowledge
            in Mongolian. Let's learn to ask and ask questions. Let's build a nest with knowledge to
            share.
          </h2>
        </div>
        <div className="absolute bottom-0 right-0 w-50 h-50 sm:w-75 sm:h-75 md:w-100 md:h-100 lg:w-125 lg:h-125 border border-black/8 rounded-full pointer-events-none">
          <div className="absolute translate-x-0.5 translate-y-0.5 top-[70%]">
            <div className="absolute top-0 left-0 translate-x-[-50%] w-[200vw] h-px bg-black/8 -rotate-20"></div>
          </div>
          <div className="relative -translate-x-1/2 -translate-y-1/2 top-[41.3%]">
            <div className="absolute top-0 left-0 w-[200vw] h-px bg-black/8 -translate-x-1/2 -rotate-25"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-6 max-md:grid-rows-4 relative">
        <div className="relative col-span-full md:col-span-2 max-md:row-start-2 max-md:row-span-3 px-4 sm:px-6 md:px-8 lg:px-10 max-md:border-t md:border-r border-black/8 py-10">
          <div>
            <Image
              src="/img.jpg"
              alt="img"
              width={800}
              height={450}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 -rotate-10 max-md:hidden">
            <div className="absolute left-1/2 -translate-x-1/2 w-[200vw] h-px bg-black/8"></div>
          </div>
        </div>
        <div className="max-md:row-start-1 max-md:col-start-2 col-span-full md:col-span-4 max-md:row-span-1 p-4 sm:p-6 md:p-8 lg:p-10 max-md:border-l border-black/8">
          <Link
            href="/"
            className="underline underline-offset-8 italic text-lg sm:text-xl md:text-2xl"
          >
            About us
          </Link>
        </div>
      </div>
    </section>
  )
}
