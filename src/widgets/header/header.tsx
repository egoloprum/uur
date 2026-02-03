'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import gsap from 'gsap'

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => {
    if (!sidebarRef.current || !overlayRef.current) return
    setIsAnimating(true)

    if (!isMenuOpen) {
      gsap.to(overlayRef.current, {
        opacity: 0.7,
        duration: 0.4,
        ease: 'power2.out',
      })

      gsap.fromTo(
        sidebarRef.current,
        {
          y: '-100%',
          opacity: 1,
        },
        {
          y: '0%',
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          onComplete: () => {
            setIsAnimating(false)
          },
        }
      )
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      })
      gsap.to(sidebarRef.current, {
        y: '-100%',
        duration: 0.5,
        ease: 'power3.inOut',
        onComplete: () => {
          setIsAnimating(false)
        },
      })
    }

    setIsMenuOpen(!isMenuOpen)
  }

  const handleLinkClick = () => {
    if (isMenuOpen) {
      toggleMenu()
    }
  }

  const navLinks = [
    { href: '/', label: 'WORKS' },
    { href: '/', label: 'ABOUT' },
    { href: '/', label: 'CONTACT' },
  ]

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-20 flex items-center justify-between px-4 sm:px-6 md:px-10 z-20 pointer-events-none">
        <Link href="/" className="flex items-center gap-1 pointer-events-auto">
          <div className="relative shrink-0 w-20 h-12">
            <Image
              src="/image.png"
              alt="logo"
              fill
              className="object-contain object-left"
              sizes="(max-width: 640px) 120px, (max-width: 768px) 160px, 200px"
              priority
            />
          </div>
          <p className="text-black text-6xl font-bold">UUR</p>
        </Link>

        <nav className="block md:hidden text-black pointer-events-auto">
          <button
            onClick={toggleMenu}
            disabled={isAnimating}
            className="underline underline-offset-4 text-xl font-medium"
          >
            {isMenuOpen ? 'Close' : 'Menu'}
          </button>
        </nav>

        <nav className="hidden md:flex gap-10 text-black pointer-events-auto">
          {navLinks.map(link => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:underline hover:underline-offset-2 text-xl"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div
        ref={sidebarRef}
        className="fixed h-screen w-screen bg-white z-10 flex flex-col items-end justify-center pb-20 pr-4 sm:pr-6 -translate-y-full md:hidden"
      >
        <nav className="flex flex-col items-end gap-4">
          {navLinks.map(link => (
            <Link
              key={link.label}
              href={link.href}
              onClick={handleLinkClick}
              className="text-black text-6xl/14 sm:text-6xl/16 md:text-7xl/20 lg:text-8xl/24 uppercase tracking-tight"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="h-20 z-5 fixed w-full bg-white border-b" />
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black opacity-0 z-9 pointer-events-none transition-opacity duration-300 md:hidden"
      />
    </>
  )
}
