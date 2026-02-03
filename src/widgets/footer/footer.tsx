import Link from 'next/link'

export const Footer = ({}) => {
  return (
    <footer className="bg-white flex justify-end p-4 sm:p-6 md:p-10 py-10">
      <nav className="flex flex-col text-black w-fit text-6xl/14 sm:text-6xl/16 md:text-7xl/20 lg:text-8xl/24">
        <Link href="/" className="hover:text-gray-500 text-end tracking-tight">
          WORKS
        </Link>
        <Link href="/" className="hover:text-gray-500 text-end tracking-tight">
          ABOUT
        </Link>
        <Link href="/" className="hover:text-gray-500 text-end tracking-tight">
          CONTACT
        </Link>
      </nav>
    </footer>
  )
}
