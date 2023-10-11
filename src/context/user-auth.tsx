/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { ReactNode, createContext, useEffect, useState } from 'react'

type Context = {
  loadedPage: boolean
  isLogged: boolean
  changeAccessToken: (token: string) => void
  removeAccessToken: () => void
}

export const UserAuthContext = createContext<undefined | Context>(undefined)

type Props = {
  children: ReactNode
}

export function UserAuthContextProvider({ children }: Props) {
  const [accessToken, setAccessToken] = useState<string>()
  const [loadedPage, setLoadedPage] = useState(false)

  async function changeAccessToken(token: string) {
    setAccessToken(token)
    window.localStorage.setItem('access-token', token)
  }

  async function removeAccessToken() {
    window.localStorage.removeItem('access-token')
  }

  useEffect(() => {
    const token = window.localStorage.getItem('access-token')

    if (token) {
      setAccessToken(token)
    }

    setLoadedPage(true)
  }, [])

  return (
    <UserAuthContext.Provider
      value={{
        loadedPage,
        isLogged: !!accessToken,
        changeAccessToken,
        removeAccessToken,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  )
}
