'use client'

import UserPage from '@/pages/user-page'

type Context = {
  params: {
    userId: string
  }
}

export default function Page({ params }: Context) {
  return <UserPage userId={params.userId} />
}
