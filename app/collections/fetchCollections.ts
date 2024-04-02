import { Collection, CollectionPhotos } from '@/types/Collection.type';
import { unsplashService } from '@/services/unsplash';

export const handleFetchCollectionsPhotos = async (page: number = 1) => {
  try {
    const collections: Collection[] =
      (await unsplashService.getCollections({ page, perPage: 6 }))?.results || [];
    let collectionsPhotos: CollectionPhotos[] = [];
    await Promise.all(
      collections.map(async (collection) => {
        const collectionPhotos: never[] = [];
        collectionsPhotos.push({
          cover_photo: { urls: { small: '' } },
          preview_photos: [],
          tags: [],
          total_photos: 0,
          user: { first_name: '', last_name: '' },
          ...collection,
          photos: collectionPhotos
        });
      })
    );
    console.log({ collectionsPhotos });
    return collectionsPhotos;
  } catch (e) {
    console.log({ e });
  }

  return [];
};
