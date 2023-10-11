import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import NavbarComponent from '@/components/navbar-component'
import { Api } from '@/utils/api'
import { Meme } from '@/@types/meme'
import MemeComponent from '@/components/meme-component'
import { UserAuthContext } from '@/context/user-auth'

export default function HomePage() {
  const userAuthContext = useContext(UserAuthContext)
  const { push } = useRouter()

  const [memesHighlights, setMemesHighlights] = useState<Meme[]>([])

  useEffect(() => {
    async function getMemesHighlights() {
      const response = await Api('/highlights', {
        method: 'GET',
      })

      if (response.status === 200) {
        setMemesHighlights(await response.json())
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

    getMemesHighlights()
  }, [])

  return (
    <div className="flex min-h-screen justify-between">
      <NavbarComponent />
      <main className="flex-1">
        <div>
          {memesHighlights.map((meme) => (
            <MemeComponent
              key={meme.id}
              id={meme.id}
              authorId={meme.authorId}
              content={{
                uri: meme.content.uri,
              }}
              tags={meme.tags}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
