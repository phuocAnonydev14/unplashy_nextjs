import {Collection, CollectionPhotos} from "@/common/types/Collection.type";
import {UnsplashService} from "@/common/services/unsplash";

export const handleFetchCollectionsPhotos = async (page: number = 1) => {
  try {
    const collections: Collection[] = (await UnsplashService.getCollections({page}))?.results || []
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
  } catch (e) {
    console.log({e})
  }

  return []
}
