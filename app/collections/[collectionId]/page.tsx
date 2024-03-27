'use client'
import {useParams} from "next/navigation";
import useRequest from "@/common/hooks/useApiRequest";
import {GetCollectionPhotoQueries, UnsplashService} from "@/common/services/unsplash";
import {useEffect} from "react";
import {Basic} from "unsplash-js/src/methods/photos/types";
import {PhotoGallery} from "@/common/components/PhotoGallery";
import {Collection} from "@/common/types/Collection.type";

export default function CollectionDetail() {
  const {collectionId} = useParams()
  const [{data: collection}, doGetCollectionDetail] = useRequest<Collection, string>(UnsplashService.getCollectionDetail)
  const [{data: collectionPhotos}, doGetCollectionPhotos] = useRequest<{
    results: Basic[]
  }, GetCollectionPhotoQueries>(UnsplashService.getCollectionPhotos)

  useEffect(() => {
    (async () => {
      if (!collectionId || typeof collectionId !== "string") return
      await Promise.all([doGetCollectionPhotos({collectionId}), doGetCollectionDetail(collectionId)])
    })()
  }, [collectionId]);


  return <div className={'px-56 py-10'}>
    <h1 className={'text-center font-semibold mb-6'} style={{fontSize: "1.8rem"}}>{collection?.title}</h1>
    {collectionPhotos?.results?.length &&
        <PhotoGallery images={collectionPhotos?.results || []} collectionId={collectionId.toString()}/>
    }</div>
}