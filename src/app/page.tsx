'use client'

import { useContext } from 'react'
import { useRouter } from 'next/navigation'

import { UserAuthContext } from '@/context/user-auth'
import HomePage from '@/pages/home-page'

export default function Page() {
  const userAuthContext = useContext(UserAuthContext)
  const { push } = useRouter()

  if (!userAuthContext?.isLogged) {
    push('/sign-in')
    return
  }

  if (!userAuthContext?.loadedPage) {
    return <p className="text-red-600">Loading...</p>
  }

  return <HomePage />
}
