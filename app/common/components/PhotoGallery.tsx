'use client'

import Masonry from "react-masonry-css";
import {Basic} from "unsplash-js/src/methods/photos/types";
import {useCallback, useEffect, useState} from "react";
import {UnsplashService} from "@/app/common/services/unsplash";
import {useInView} from "react-intersection-observer";
import {Skeleton} from "@/components/ui/skeleton";
import {useSearchParams} from "next/navigation";
import useRequest from "@/app/common/hooks/useApiRequest";
import {Each} from "@/app/common/components/shared-components/Each";

const breakPoints = {
  default: 3,
  1100: 2,
  700: 1
}


interface PhotoGalleryProps {
  images: Basic[],
  collectionId?: string
}

export const PhotoGallery = (props: PhotoGalleryProps) => {
  const {images, collectionId} = props
  const [photos, setPhotos] = useState(images)
  const [pagination, setPagination] = useState<{ page: number, perPage: number }>({page: 1, perPage: 10})
  const {ref, inView} = useInView()
  const searchParams = useSearchParams()
  const collection = searchParams.get('collection') || collectionId
  const [{loading: getPhotoLoading}, doGetPhotos] = useRequest(UnsplashService.getPhotos)
  const [{loading: getCollectionPhotoLoading}, doGetCollectionPhoto] = useRequest(UnsplashService.getCollectionPhotos)
  const [firstLoad, setFirstLoad] = useState(false)
  const handleLoadCollectionPhotos = async () => {
    if (!firstLoad) return
    try {
      setPagination({page: 1, perPage: 10})
      let photoResponse: Basic[] = []
      if (!collection) {
        photoResponse = (await doGetPhotos({page: 1, perPage: pagination.perPage}))?.results || []
      } else
        photoResponse = (await doGetCollectionPhoto({collectionId: collection, page: 1, perPage: 10}))?.results || []
      setPhotos(photoResponse)
    } catch (e) {
      console.log({e})
    }
  }

  const handleLoadMorePhotos = useCallback(async () => {
    if (!firstLoad) return
    try {
      let photoResponse: Basic[] = []
      // check if have collection in router query
      if (collection) {
        photoResponse = (await doGetCollectionPhoto({
          collectionId: collection, page: pagination.page + 1,
          perPage: pagination.perPage
        }))?.results || []
      }
      // else {
        photoResponse = (await doGetPhotos({
          page: pagination.page + 1,
          perPage: pagination.perPage
        }))?.results || []
      // }
      if (!photoResponse) return
      setPhotos(prevState => ([...prevState, ...photoResponse]))
      setPagination(prevState => ({...prevState, page: prevState.page + 1}))
    } catch (e) {
      console.log({e})
    }

  }, [collection, pagination.page, pagination.perPage, firstLoad])

  useEffect(() => {
    setFirstLoad(true)
    handleLoadCollectionPhotos().then()
  }, [collection]);

  useEffect(() => {
    if (inView) {
      handleLoadMorePhotos().then()
    }
  }, [inView]);

  return <div>
    <Masonry
      breakpointCols={breakPoints}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {photos.map(photo => (
        <div key={photo.id}>
          <img loading={"eager"} className='images' src={photo.urls.small} alt={photo.alt_description || ''}/>
        </div>
      ))}
    </Masonry>
    <div ref={ref} className={'flex gap-3 flex-wrap'}>
      {collection && <Each<number>
          render={(item, index) =>
            <div key={item} className="flex flex-col space-y-3">
              <Skeleton className="min-h-[225px] min-w-[320px] rounded-xl"/>
            </div>}
          of={Array.from([1, 2, 3])}
      >
      </Each>
      }
    </div>
  </div>
}