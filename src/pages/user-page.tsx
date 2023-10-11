import { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import NavbarComponent from '@/components/navbar-component'
import { Api } from '@/utils/api'
import { User } from '@/@types/user'
import { Folder } from '@/@types/folder'
import { UserAuthContext } from '@/context/user-auth'

interface Props {
  userId: string
}

export default function UserPage({ userId }: Props) {
  const userAuthContext = useContext(UserAuthContext)
  const { push } = useRouter()

  const [userInfo, setUserInfo] = useState<User>()
  const [foldersFromUser, setFoldersFromUser] = useState<Folder[]>([])

  useEffect(() => {
    async function getUserInfo() {
      const response = await Api(`/user-info?userId=${userId}`, {
        method: 'GET',
      })

      if (response.status === 200) {
        setUserInfo(await response.json())
      }

      if (response.status === 401) {
        userAuthContext?.removeAccessToken()

        push('/')
        return
      }

      if (response.status >= 500) {
        alert('Ops... parece que algo deu errado, tente novamente mais tarde')
      }
    }

    getUserInfo()
  }, [userId])

  useEffect(() => {
    async function getUserInfo() {
      const response = await Api(`/get-folders?userId=${userId}`, {
        method: 'GET',
      })

      if (response.status === 200) {
        setFoldersFromUser(await response.json())
      }

      if (response.status === 401) {
        userAuthContext?.removeAccessToken()

        push('/')
        return
      }

      if (response.status >= 500) {
        alert('Ops... parece que algo deu errado, tente novamente mais tarde')
      }
    }

    getUserInfo()
  }, [userId])

  useEffect(() => {
    console.log(foldersFromUser)
  }, [foldersFromUser])

  return (
    <div className="flex min-h-screen justify-between">
      <NavbarComponent />
      <main className="flex-1">
        <div>
          <h2>{userInfo?.username}</h2>
          {foldersFromUser.map((folder) => (
            <a
              key={folder.id}
              href={`/folder/${folder.id}`}
              className="w-[20vh] flex flex-col items-center"
            >
              <Image
                className="w-[100%]"
                src={folder.thumbnail}
                alt={folder.folderName}
                width={120}
                height={100}
              />
              <h3>{folder.folderName}</h3>
            </a>
          ))}
        </div>
      </main>
    </div>
  )
}
