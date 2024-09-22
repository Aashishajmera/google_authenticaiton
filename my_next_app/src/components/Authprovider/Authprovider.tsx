"use client"
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

interface ClientWrapperProps {
  children: ReactNode;
}

export const ClientWrapper = ({ children }: ClientWrapperProps) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}
