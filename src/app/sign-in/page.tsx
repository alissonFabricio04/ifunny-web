'use client'

import { useContext } from 'react'
import { useRouter } from 'next/navigation'

import { UserAuthContext } from '@/context/user-auth'
import SignInPage from '@/pages/signIn-page'

export default function Page() {
  const userAuthContext = useContext(UserAuthContext)
  const { push } = useRouter()

  if (userAuthContext?.isLogged) {
    push('/')
    return
  }

  return <SignInPage />
}
