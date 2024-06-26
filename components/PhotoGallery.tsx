'use client';

import { Basic } from 'unsplash-js/src/methods/photos/types';
import { memo, useCallback, useEffect, useState } from 'react';
import { unsplashService } from '@/services/unsplash';
import { useInView } from 'react-intersection-observer';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import useRequest from '@/hooks/useApiRequest';
import { PhotoDetailModal } from '@/components/PhotoDetailModal';
import { EmptyData } from '@/components/shared-components/EmptyData';
import { useToast } from '@/components/ui/use-toast';
import { SkeletonLoading } from '@/components/shared-components/SkeletonLoading';
import { PhotoGalleryBox } from '@/components/PhotoGalleryBox';

const PhotoGalleryBoxMemo = memo(PhotoGalleryBox);

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
  const [selectedImageUrl, setSelectedImageUrl] = useState('');

  const [, doGetPhotos] = useRequest(unsplashService.getPhotos);
  const [, doGetCollectionPhoto] = useRequest(unsplashService.getCollectionPhotos);
  const searchParams = useSearchParams();
  const collection = searchParams.get('collection') || collectionId;
  const { ref, inView } = useInView();
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const [currentPathname, setCurrentPathname] = useState(pathname);

  useEffect(() => {
    setCurrentPathname(pathname);
  }, []);

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
      <div className="wrapper max-w-[1440px]">
        {photos?.map((photo) => (
          <PhotoGalleryBoxMemo
            url={photo.urls.small}
            id={photo.id}
            description={photo.alt_description || ''}
            key={photo.id}
            handleClick={() => {
              setIsOpenDetail(photo.id);
              setSelectedImageUrl(photo.urls.small);
              window.history.pushState({}, '', `/${photo.id}`);
            }}
          />
        ))}
      </div>

      {images?.length > 0 ? (
        <div>
          {!isEndPagination && (
            <div ref={ref} className="flex gap-3 flex-wrap" style={{ flexWrap: 'wrap' }}>
              <SkeletonLoading />
            </div>
          )}
        </div>
      ) : (
        <EmptyData />
      )}

      {isOpenDetail && (
        <PhotoDetailModal
          photoId={isOpenDetail}
          presetUrl={selectedImageUrl}
          onClose={() => {
            setIsOpenDetail('');
            router.push(currentPathname, { scroll: false });
          }}
        />
      )}
    </div>
  );
};
