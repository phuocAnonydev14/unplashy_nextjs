import {CollectionBox} from "@/app/collections/components/CollectionBox";
import {UnsplashService} from "@/app/common/services/unsplash";
import {Collection, CollectionPhotos} from "@/app/common/types/Collection.type";
import {Each} from "@/app/common/components/shared-components/Each";


const handleFetchCollectionsPhotos = async () => {
  const collections: Collection[] = (await UnsplashService.getCollections())?.results || []
  let collectionsPhotos: CollectionPhotos[] = []
  await Promise.all(collections.map(async collection => {
    const collectionPhotos = (await UnsplashService.getCollectionPhotos({
      collectionId: collection.id,
      page: 1,
      perPage: 10
    }))?.results || []
    collectionsPhotos.push({...collection, photos: collectionPhotos})
  }))
  return collectionsPhotos
}

export default async function Collections() {
  const collectionsPhotos = await handleFetchCollectionsPhotos()

  if (!collectionsPhotos) return

  return <div className={'mt-6 px-20'}>
    <Each<CollectionPhotos>
      render={(collectionPhotos) => <CollectionBox collectionPhotos={collectionPhotos}/>}
      of={collectionsPhotos}
    />
  </div>
}