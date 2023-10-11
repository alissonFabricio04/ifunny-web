import { Tag } from './tag'

export interface Meme {
  id: string
  authorId: string
  content: {
    uri: string
  }
  tags: Tag[]
}
