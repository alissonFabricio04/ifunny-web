import { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import NavbarComponent from '@/components/navbar-component'
import { Api } from '@/utils/api'
import { Meme } from '@/@types/meme'
import { UserAuthContext } from '@/context/user-auth'
import { Folder } from '@/@types/folder'
import { sourceType } from '@/utils/sourceType'

interface Props {
  userId: string
  folderId: string
}

export default function FolderPage({ folderId, userId }: Props) {
  const userAuthContext = useContext(UserAuthContext)
  const { push } = useRouter()

  const [folderInfo, setFolderInfo] = useState<Folder>()
  const [memesFromFolder, setMemesFromFolder] = useState<Meme[]>([])

  useEffect(() => {
    async function getFolderInfo() {
      const url = `/get-memes-in-folder?folderId=${folderId}${
        userId !== undefined ? `&userId=${userId}` : ''
      }`
      const response = await Api(url, {
        method: 'GET',
      })

      if (response.status === 200) {
        const body = await response.json()
        setFolderInfo(body.folder)
        setMemesFromFolder(body.memes)
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

    getFolderInfo()
  }, [folderId])

  useEffect(() => {
    console.log(memesFromFolder)
  }, [memesFromFolder])

  return (
    <div className="flex min-h-screen justify-between">
      <NavbarComponent />
      <main className="flex-1">
        <div className="flex flex-col items-center justify-center">
          <Image
            src={
              folderInfo?.thumbnail ??
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIoAAACKCAMAAABCWSJWAAAAMFBMVEXm5uaztbSusK/f39/P0M/p6em7vbzi4uLFxsXCw8K+wL/a2trLzMvIyci3ubjW19Yu8EXDAAAC3klEQVR4nO2Z627rIAyAaYwxd97/bWfTy9kSUm1SITqSvx9Rc9n4asA41BhFURRFURRFURRFURRFURRFUZaAA64xaW5Au0AE7XYbsNn1gcGRiLDcxMAwKBwWWG2C7Uylre4hzGcdVJarhDOVsEYFU/YP6plKfT6R00ypctb+SV9NE8F8MlTP2PKsuMC4vZuL0d3GlrNmdhs1FhLJPUrDcWwnqdhjRAK8ugAhHCOzTuXngoODBxap3Jc+NNAamP7xkIIXqfT5gabUjalFZA5zbJGKM5LzXqdVMhq6K1T6uvdjfoN00RUqPSg/0n+V8eIuUOGRshumEqfdir1EZZOhsUtrUQbPtl6FRwbtlufKiZcuUCFVGajIorvLIjKp4AIVe5gufVLZ9SoyXXa9IX22m1SLEj/sL0m7u/JqkYq8ZWB5xWW7n1+i0pMcttpltipL0i7BratXZO5yadB8jL71goV2T6yr4uq9nHzuqyAcXo7WFZTc1L/adlSGL1TZIg+YHhVMcfD+MUslHZuS8RqytTnU4YvQtE0oN2rtHW6WCQ7D8o55L/AI8bb9mluEqfsbBL+GZnr8Z0zec/rDlGzHTELpL//gPeTuSQx7jv9+EO4nvCb3vRQH5nEDH4/wWMf6qX0WVsk5thLIFF8MHzKY7OX7o7XBInleDqtsd9mawPtk+J6lXELD5ktA96khzCq1pUrFcvgDFEsOsnySjcpsHMVmIrAAV06B40J8xZhIN0oRorER44dMRCUSBY4AB6SmyDUtuCKRMOgTem4ObesdBJ6f44tdxaEJjWMWMHxWJbKKb9xMSBiAD61HhVUoEvuErsKdYVBiwaERleR5ncRPDltHfLC2Oe8axeAAapABgN2ruVjQ9lcPFnbOYnEhUkX257qKO+hj6Q77Ns7zpygL/LVf5RKaZ5WAj0fvJ/jtj6YlGwhhVhnyZy77XU5RFEVRFEVRFEVRFEVRFEVRlBdfr4QaQrxsfb4AAAAASUVORK5CYII='
            }
            alt={folderInfo?.folderName ?? 'Folder name'}
            width={120}
            height={100}
          />
          <h2>{folderInfo?.folderName}</h2>
        </div>

        {memesFromFolder.map((meme) => (
          <div key={meme.id} className="justify-between p-4">
            {sourceType(meme.content.uri)?.includes('mp') ? (
              <VideoBoxMeme
                id={meme.id}
                authorId={meme.authorId}
                content={meme.content}
                tags={meme.tags}
              />
            ) : (
              <ImageBoxMeme
                id={meme.id}
                authorId={meme.authorId}
                content={meme.content}
                tags={meme.tags}
              />
            )}
            {/* <source
              width={120}
              height={100}
              src={meme.content.uri}
              src="https://web.whatsapp.com/stream/video?key=true_5511976726939@c.us_3EB03A24212895B660920D"
              type={sourceType(meme.content.uri)}
            /> */}
          </div>
        ))}
      </main>
    </div>
  )
}

function VideoBoxMeme(meme: Meme) {
  return (
    <div className="bg-zinc-950 space-y-4 pb-4 rounded-md max-w-[250px]">
      <a href={`/meme/${meme.id}`}>
        <video className="w-full">
          <source
            src={meme.content.uri + '#t=0.1'}
            type={sourceType(meme.content.uri)}
          />
          Your browser does not support the video tag.
        </video>
      </a>

      <div className="flex flex-wrap justify-around">
        {meme.tags.map((tag) => (
          <div
            key={tag.name}
            className="text-amber-500 bg-black w-auto px-4 py-1 rounded-2xl text-sm"
          >
            #{tag.name}
          </div>
        ))}
      </div>
    </div>
  )
}

function ImageBoxMeme(meme: Meme) {
  return <Image width={120} height={100} src={meme.content.uri} alt={meme.id} />
}
