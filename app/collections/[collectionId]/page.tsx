import { unsplashService } from '@/common/services/unsplash';
import { PhotoGallery } from '@/components/PhotoGallery';
import { EmptyData } from '@/components/shared-components/EmptyData';

interface CollectionDetailProps {
  params: {
    collectionId?: string | string[];
  };
}

export default async function CollectionDetail(props: CollectionDetailProps) {
  const { collectionId } = props.params;

  if (!collectionId || typeof collectionId !== 'string') return;

  const [collectionPhotos, collection] = await Promise.all([
    unsplashService.getCollectionPhotos({ collectionId }),
    unsplashService.getCollectionDetail(collectionId)
  ]);

  if (!collectionPhotos && !collection) return <EmptyData />;
  return (
    <div className={'lg:px-56 md:px-14 sm:px-10 px-5 py-10'}>
      <h1 className={'text-center font-semibold mb-6'} style={{ fontSize: '1.8rem' }}>
        {collection?.title}
      </h1>
      {collectionPhotos?.results?.length && (
        <PhotoGallery
          images={collectionPhotos?.results || []}
          collectionId={collectionId.toString()}
        />
      )}
    </div>
  );
}
