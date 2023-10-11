'use client'

import { useEffect, useState } from 'react'

import { Api } from '@/utils/api'
import { User } from '@/@types/user'

export default function NavbarComponent() {
  const [userInfo, setUserInfo] = useState<User>()

  useEffect(() => {
    async function getUserInfo() {
      const response = await Api('/user-info', {
        method: 'GET',
      })

      if (response.status === 200) {
        setUserInfo(await response.json())
      }

      if (response.status >= 500) {
        alert('Ops... parece que algo deu errado, tente novamente mais tarde')
      }
    }

    getUserInfo()
  }, [])

  return (
    <aside className="flex flex-col gap-4 bg-slate-300 p-4">
      <ul>
        <li>
          <a href={`/user/${userInfo?.id}`}>
            {userInfo?.username ?? 'Erro ao carregar'}
          </a>
        </li>
      </ul>
      <ul>
        <li>Para você</li>
        <li>Destaques</li>
        <li>Coletivo</li>
      </ul>
    </aside>
  )
}
