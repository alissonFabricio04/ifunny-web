'use client'

import FolderPage from '@/pages/folder-page'

type Context = {
  params: {
    folderId: string
    userId: string
  }
}

export default function Page({ params }: Context) {
  return <FolderPage folderId={params.folderId} userId={params.userId} />
}
