import { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'

import { Api } from '@/utils/api'
import { UserAuthContext } from '@/context/user-auth'

interface InfoForSignIn {
  username: string
  password: string
}

export default function SignInPage() {
  const userAuthContext = useContext(UserAuthContext)
  const { push } = useRouter()

  const [infoForSignIn, setInfoForSignIn] = useState<InfoForSignIn>()

  async function postSignIn() {
    const response = await Api('/sign-in', {
      method: 'POST',
      body: JSON.stringify(infoForSignIn),
    })

    if (response.status === 200) {
      const token = (await response.json()).token
      userAuthContext?.changeAccessToken(token)

      push('/')
      return
    }

    if (response.status >= 400) {
      alert((await response.json()).message)
    }

    if (response.status >= 500) {
      alert('Ops... parece que algo deu errado, tente novamente mais tarde')
    }
  }

  return (
    <div className="flex min-h-screen items-center bg-yellow-500">
      <div className="flex flex-col bg-slate-50">
        <input
          type="text"
          name="username"
          className="text-black"
          onChange={(e) =>
            setInfoForSignIn((prev) => {
              if (!prev) return { password: '', username: e.target.value }
              return { ...prev, username: e.target.value }
            })
          }
        />
        <input
          type="password"
          name="password"
          className="text-black"
          onChange={(e) =>
            setInfoForSignIn((prev) => {
              if (!prev) return { password: e.target.value, username: '' }
              return { ...prev, password: e.target.value }
            })
          }
        />

        <button onClick={postSignIn}>Sign In</button>
      </div>
    </div>
  )
}
