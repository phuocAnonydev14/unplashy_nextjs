'use client'

import {CollectionPhotos} from "@/common/types/Collection.type";
import {CollectionBox} from "@/app/collections/components/CollectionBox";
import {Each} from "@/common/components/shared-components/Each";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {useEffect, useState} from "react";
import {handleFetchCollectionsPhotos} from "@/app/collections/fetchCollections";
import useMediaQuery from "@/common/hooks/useMediaQuery";

export const CollectionWrapper = ({collectionsPhotos}: { collectionsPhotos: CollectionPhotos[] }) => {
  const [page, setPage] = useState(1)
  const [collectionPhotoMapper, setCollectionPhotoMapper] = useState<CollectionPhotos[]>([])
  const isMobile = useMediaQuery("(max-width: 928px)")

  useEffect(() => {
    setCollectionPhotoMapper(collectionsPhotos)
  }, [collectionsPhotos]);

  useEffect(() => {
    if (page === 1) return
    (async () => {
      const res = await handleFetchCollectionsPhotos(page)
      setCollectionPhotoMapper(res)
    })()
  }, [page]);

  return (
    <div className={'mb-6'}>
      <Each<CollectionPhotos>
        render={(collectionPhotos) => <CollectionBox collectionPhotos={collectionPhotos}/>}
        of={collectionPhotoMapper}
      />

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" onClick={() => setPage(page - 1)}/>
          </PaginationItem>
          {...Array.from({length:isMobile ? 2 : 9}).map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                isActive={page === i + 1}
                href="#"
                onClick={() => setPage(i + 1)}>{i + 1}
              </PaginationLink>
            </PaginationItem>))}
          <PaginationItem>
            <PaginationEllipsis/>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" onClick={() => setPage(page + 1)}/>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}