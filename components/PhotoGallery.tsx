'use client';

import Masonry from 'react-masonry-css';
import { Basic } from 'unsplash-js/src/methods/photos/types';
import { useCallback, useEffect, useState } from 'react';
import { UnsplashService } from '@/common/services/unsplash';
import { useInView } from 'react-intersection-observer';
import { useSearchParams } from 'next/navigation';
import useRequest from '@/common/hooks/useApiRequest';
import { PhotoDetailModal } from '@/components/PhotoDetailModal';
import { EmptyData } from '@/components/shared-components/EmptyData';
import { useToast } from '@/components/ui/use-toast';
import { SkeletonLoading } from '@/components/shared-components/SkeletonLoading';

const breakPoints = {
  default: 3,
  1100: 2,
  700: 1
};

interface PhotoGalleryProps {
  images: Basic[];
  collectionId?: string;
  searchAction?: (page: number) => Promise<Basic[]>;
}

export const PhotoGallery = (props: PhotoGalleryProps) => {
  const { images, collectionId, searchAction } = props;
  const [photos, setPhotos] = useState(images);
  const [pagination, setPagination] = useState<{ page: number; perPage: number }>({
    page: 1,
    perPage: 10
  });
  const [firstLoad, setFirstLoad] = useState(false);
  const [isOpenDetail, setIsOpenDetail] = useState('');
  const [isEndPagination, setIsEndPagination] = useState(false);

  const [, doGetPhotos] = useRequest(UnsplashService.getPhotos);
  const [, doGetCollectionPhoto] = useRequest(UnsplashService.getCollectionPhotos);
  const searchParams = useSearchParams();
  const collection = searchParams.get('collection') || collectionId;
  const { ref, inView } = useInView();
  const { toast } = useToast();

  const handleLoadCollectionPhotos = async () => {
    if (!firstLoad) return;
    try {
      setPagination({ page: 1, perPage: 10 });
      let photoResponse: Basic[];
      if (!collection) {
        photoResponse =
          (await doGetPhotos({ page: 1, perPage: pagination.perPage }))?.results || [];
      } else
        photoResponse =
          (await doGetCollectionPhoto({ collectionId: collection, page: 1, perPage: 10 }))
            ?.results || [];
      setPhotos(photoResponse);
    } catch (e) {
      console.log({ e });
    }
  };

  const handleFetchPhotos = async () => {
    try {
      // check if you have collection in router query
      if (searchAction) {
        return searchAction(pagination.page);
      }
      // if (collection) {
      //   (await doGetCollectionPhoto({
      //     collectionId: collection, page: pagination.page + 1,
      //     perPage: pagination.perPage
      //   }))?.results || []
      // }
      return (
        (
          await doGetPhotos({
            page: pagination.page + 1,
            perPage: pagination.perPage
          })
        )?.results || []
      );
    } catch (e) {
      console.log({ e });
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.'
        // action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  const handleLoadMorePhotos = useCallback(async () => {
    if (!firstLoad) return;
    try {
      let photoResponse: Basic[] = await handleFetchPhotos();
      if (!photoResponse || photoResponse.length === 0) {
        setIsEndPagination(true);
        return;
      }
      setPhotos((prevState) => [...prevState, ...photoResponse]);
      setPagination((prevState) => ({ ...prevState, page: prevState.page + 1 }));
    } catch (e) {
      console.log({ e });
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.'
        // action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  }, [collection, pagination.page, pagination.perPage, firstLoad]);

  useEffect(() => {
    setPhotos(images);
    setPagination({ page: 1, perPage: 10 });
  }, [images]);

  useEffect(() => {
    setFirstLoad(true);
    handleLoadCollectionPhotos().then();
  }, [collection]);

  useEffect(() => {
    if (inView) {
      handleLoadMorePhotos().then();
    }
  }, [inView]);

  return (
    <div>
      <Masonry
        breakpointCols={breakPoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {photos?.map((photo) => (
          <div onClick={() => setIsOpenDetail(photo.id)} key={photo.id}>
            <img
              style={{ cursor: 'zoom-in' }}
              loading={'lazy'}
              className="images"
              src={photo.urls.small}
              alt={photo.alt_description || ''}
            />
          </div>
        ))}
      </Masonry>

      {images?.length > 0 ? (
        <div>
          {!isEndPagination && (
            <div ref={ref} className={'flex gap-3 flex-wrap'} style={{ flexWrap: 'wrap' }}>
              <SkeletonLoading />
            </div>
          )}
        </div>
      ) : (
        <EmptyData />
      )}
      {isOpenDetail && (
        <PhotoDetailModal photoId={isOpenDetail} onClose={() => setIsOpenDetail('')} />
      )}
    </div>
  );
};
