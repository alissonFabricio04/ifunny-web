'use client'

import MemePage from '@/pages/meme-page'

type Context = {
  params: {
    memeId: string
  }
}

export default function Page({ params }: Context) {
  return <MemePage memeId={params.memeId} />
}
