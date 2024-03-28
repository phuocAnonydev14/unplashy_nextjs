import { CollectionWrapper } from '@/app/collections/components/CollectionWrapper';
import { handleFetchCollectionsPhotos } from '@/app/collections/fetchCollections';

export default async function Collections() {
  const collectionsPhotos = await handleFetchCollectionsPhotos();

  if (!collectionsPhotos) return;

  return (
    <div className={'mt-6 xl:px-20 md:px-10 sm:px-5'}>
      <CollectionWrapper collectionsPhotos={collectionsPhotos} />
    </div>
  );
}
