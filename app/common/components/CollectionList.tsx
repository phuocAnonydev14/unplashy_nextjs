'use client'

import {useEffect} from "react";
import {UnsplashService} from "@/app/common/services/unsplash";

export const CollectionList = () => {

  useEffect(() => {
    (async () => {
      const res = await UnsplashService.getPhotos()
      console.log(res)
    })()
  }, []);

  return <div>

  </div>
}