import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import NavbarComponent from '@/components/navbar-component'
import { Api } from '@/utils/api'
import { Meme } from '@/@types/meme'
import { UserAuthContext } from '@/context/user-auth'
import { sourceType } from '@/utils/sourceType'

interface Props {
  memeId: string
}

export default function MemePage({ memeId }: Props) {
  const userAuthContext = useContext(UserAuthContext)
  const { push } = useRouter()

  const [meme, setMeme] = useState<Meme>()

  useEffect(() => {
    async function getMeme() {
      const url = `/get-meme?memeId=${memeId}`
      const response = await Api(url, {
        method: 'GET',
      })

      if (response.status === 200) {
        const body = await response.json()
        setMeme(body)
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

    getMeme()
  }, [memeId])

  useEffect(() => {
    console.log(meme)
  }, [meme])

  return (
    <div className="flex min-h-screen justify-between">
      <NavbarComponent />
      <main className="flex-1">
        <div className="flex flex-col items-center justify-center">
          <div className="bg-zinc-950 space-y-4 pb-4 rounded-md max-w-[250px]">
            <video className="w-full">
              <source
                src={meme?.content.uri + '#t=0.1'}
                type={meme?.content.uri ? sourceType(meme?.content.uri) : ''}
              />
              Your browser does not support the video tag.
            </video>

            <div className="flex flex-wrap justify-around">
              {meme?.tags.map((tag) => (
                <div
                  key={tag.name}
                  className="text-amber-500 bg-black w-auto px-4 py-1 rounded-2xl text-sm"
                >
                  #{tag.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
