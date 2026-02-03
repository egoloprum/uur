'use client'

import { ReactLenis, useLenis } from 'lenis/react'
import { FC, ReactNode } from 'react'

type LenisScrollProviderProps = {
  children: ReactNode
}

export const LenisScrollProvider: FC<LenisScrollProviderProps> = ({ children }) => {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}
