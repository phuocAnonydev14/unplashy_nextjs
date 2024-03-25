'use client'
import {Collection} from "@/app/common/types/Collection.type";
import {Button} from "@/components/ui/button";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

interface CollectionsProps {
  collections: Collection[]
}

export const Collections = (props: CollectionsProps) => {
  const {collections} = props
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const handleChooseCollection = async (collectionId?: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (!collectionId) {
      params.delete("collection")
    } else {
      params.set('collection', collectionId)
    }
    router.push(pathname + '?' + params.toString())
  }

  return <div className={'flex gap-3 mb-10 overflow-auto max-w-[100%] pb-1'}>
    <Button
      onClick={() => handleChooseCollection()}
      variant={!searchParams.get('collection') ? "default" : "secondary"}
      className={""}
      key={'discover'}>Discover
    </Button>
    {collections.map(({title, id}) => {
      return <Button
        onClick={() => handleChooseCollection(id)}
        variant={searchParams.get('collection') === id ? "default" : "secondary"}
        className={""}
        key={id}>{title}
      </Button>
    })}
  </div>
}