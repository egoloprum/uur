'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  { name: 'Human Form Study', image: '/img.jpg', topic: 'Luxe' },
  { name: 'Interior Light', image: '/img.jpg', topic: 'Luxe' },
  { name: 'Project 21', image: '/img.jpg', topic: 'Luxe' },
  { name: 'Shadow Portraits', image: '/img.jpg', topic: 'Luxe' },
  { name: 'Everyday Objects', image: '/img.jpg', topic: 'Luxe' },
  { name: 'Unit 07 Care', image: '/img.jpg', topic: 'Luxe' },
  { name: 'Motion Practice', image: '/img.jpg', topic: 'Luxe' },
  { name: 'Moonlight Series', image: '/img.jpg', topic: 'Luxe' },
  { name: 'Material Stillness', image: '/img.jpg', topic: 'Luxe' },
  { name: 'Quiet Walk', image: '/img.jpg', topic: 'Luxe' },
]

export const WorksSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const indexRef = useRef<HTMLHeadingElement>(null)
  const imagesContainerRef = useRef<HTMLDivElement>(null)
  const namesContainerRef = useRef<HTMLDivElement>(null)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])
  const nameRefs = useRef<(HTMLParagraphElement | null)[]>([])

  useEffect(() => {
    const lenis = new Lenis()

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(time => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    const section = sectionRef.current
    const indexEl = indexRef.current
    const imagesContainer = imagesContainerRef.current
    const namesContainer = namesContainerRef.current

    if (!section || !indexEl || !imagesContainer || !namesContainer) return

    const totalProjectCount = projects.length

    const spotlightSectionHeight = section.offsetHeight
    const spotlightSectionPadding = parseFloat(getComputedStyle(section).paddingTop)
    const projectIndexHeight = indexEl.offsetHeight
    const containerHeight = namesContainer.offsetHeight
    const imagesHeight = imagesContainer.offsetHeight

    const moveDistanceIndex =
      spotlightSectionHeight - spotlightSectionPadding * 2 - projectIndexHeight
    const moveDistanceNames = spotlightSectionHeight - spotlightSectionPadding * 2 - containerHeight
    const moveDistanceImages = window.innerHeight - imagesHeight
    const imgActivationThreshold = window.innerHeight / 2

    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${window.innerHeight * 5}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: self => {
        const progress = self.progress
        const currentIndex = Math.min(
          Math.floor(progress * totalProjectCount) + 1,
          totalProjectCount
        )

        indexEl.children[0].textContent = `${String(currentIndex).padStart(2, '0')}`
        indexEl.children[2].textContent = `${String(totalProjectCount).padStart(2, '0')}`

        gsap.set(indexEl, {
          y: progress * moveDistanceIndex,
        })

        gsap.set(imagesContainer, {
          y: progress * moveDistanceImages,
        })

        imageRefs.current.forEach(img => {
          if (!img) return
          const imgRect = img.getBoundingClientRect()
          const imgTop = imgRect.top
          const imgBottom = imgRect.bottom

          if (imgTop <= imgActivationThreshold && imgBottom >= imgActivationThreshold) {
            gsap.set(img, { opacity: 1 })
          } else {
            gsap.set(img, { opacity: 0.5 })
          }
        })

        nameRefs.current.forEach((p, index) => {
          if (!p) return
          const startProgress = index / totalProjectCount
          const endProgress = (index + 1) / totalProjectCount
          const projectProgress = Math.max(
            0,
            Math.min(1, (progress - startProgress) / (endProgress - startProgress))
          )

          gsap.set(p, {
            y: -projectProgress * (moveDistanceNames - 60),
          })

          if (projectProgress > 0 && projectProgress < 1) {
            gsap.set(p, { color: '#000' })
          } else {
            gsap.set(p, { color: '#6a7282' })
          }
        })
      },
    })

    return () => {
      scrollTrigger.kill()
      lenis.destroy()
      gsap.ticker.remove(time => lenis.raf(time * 1000))
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen p-4 sm:p-6 md:p-10 overflow-hidden bg-white"
    >
      <div className="project-index my-4 sm:my-6 md:my-10">
        <h2
          ref={indexRef}
          className="font-normal leading-none uppercase will-change-transform text-black"
        >
          <span className="text-8xl mr-4">01</span>
          <span className="text-4xl">/</span>
          <span className="text-4xl">10</span>
        </h2>
      </div>

      <div
        ref={imagesContainerRef}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[35%] py-[25vh] lg:py-[50vh] flex flex-col gap-2 -z-10 will-change-transform md:w-[35%] max-lg:w-[calc(100%-5rem)] max-md:w-[calc(100%-3rem)] max-sm:w-[calc(100%-2rem)]"
      >
        {projects.map((project, index) => (
          <section key={index} className="transition-all duration-300 ease will-change-transform">
            <div
              ref={el => {
                imageRefs.current[index] = el
              }}
              className="w-full aspect-video opacity-50 overflow-hidden"
            >
              <Image
                src={project.image}
                alt={project.name}
                width={800}
                height={450}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="py-5 text-black flex justify-between md:hidden">
              <h3 className="text-2xl tracking-tight">{project.name}</h3>
              <p className="">{project.topic}</p>
            </div>
          </section>
        ))}
      </div>

      <div
        ref={namesContainerRef}
        className="absolute right-8 bottom-8 hidden md:flex flex-col items-end will-change-transform"
      >
        {projects.map((project, index) => (
          <p
            key={index}
            ref={el => {
              nameRefs.current[index] = el
            }}
            className="text-xl lg:text-2xl xl:text-4xl uppercase font-medium leading-tight text-gray-500 transition-colors duration-300 ease will-change-transform"
          >
            {project.name}
          </p>
        ))}
      </div>
    </section>
  )
}
