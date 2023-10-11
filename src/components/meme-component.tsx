import { Meme } from '@/@types/meme'
import { sourceType } from '@/utils/sourceType'

type Props = Meme

export default function MemeComponent(meme: Props) {
  return (
    <div className="flex flex-col">
      <source src={meme.content.uri} type={sourceType(meme.content.uri)} />
      <div className="flex flex-wrap">
        {meme.tags.map((tag) => (
          <span key={tag.name} className="text-amber-500">
            #{tag.name}
          </span>
        ))}
      </div>
    </div>
  )
}
