'use client';

import { CollectionPhotos } from '@/types/Collection.type';
import { CollectionBox } from '@/app/collections/components/CollectionBox';
import { Each } from '@/components/shared-components/Each';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import { useEffect, useState } from 'react';
import { handleFetchCollectionsPhotos } from '@/app/collections/fetchCollections';
import useMediaQuery from '@/hooks/useMediaQuery';
import { EmptyData } from '@/components/shared-components/EmptyData';
import { useToast } from '@/components/ui/use-toast';

export const CollectionWrapper = ({
  collectionsPhotos
}: {
  collectionsPhotos: CollectionPhotos[];
}) => {
  const [page, setPage] = useState(1);
  const [collectionPhotoMapper, setCollectionPhotoMapper] = useState<CollectionPhotos[]>([]);
  const isMobile = useMediaQuery('(max-width: 928px)');
  const { toast } = useToast();

  useEffect(() => {
    setCollectionPhotoMapper(collectionsPhotos);
  }, [collectionsPhotos]);

  useEffect(() => {
    if (page === 1) return;
    (async () => {
      try {
        const res = await handleFetchCollectionsPhotos(page);
        setCollectionPhotoMapper(res);
      } catch (e) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.'
          // action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    })();
  }, [page]);

  return (
    <div className="mb-6">
      <Each<CollectionPhotos>
        render={(collectionPhotos) => <CollectionBox collectionPhotos={collectionPhotos} />}
        of={collectionPhotoMapper}
      />
      {collectionPhotoMapper?.length > 0 ? (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={() => setPage(page - 1)} />
            </PaginationItem>
            {...Array.from({ length: isMobile ? 2 : 9 }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink isActive={page === i + 1} href="#" onClick={() => setPage(i + 1)}>
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" onClick={() => setPage(page + 1)} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      ) : (
        <EmptyData />
      )}
    </div>
  );
};
