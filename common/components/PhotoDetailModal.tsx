'use client'
import Modal from 'react-responsive-modal';
import "react-responsive-modal/styles.css";
import {useEffect, useState} from "react";
import {Basic} from "unsplash-js/src/methods/photos/types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenNib, faUser} from "@fortawesome/free-solid-svg-icons";
import {faTwitter} from "@fortawesome/free-brands-svg-icons";
import {LazyLoadImage} from "react-lazy-load-image-component"
import {UnsplashService} from "@/common/services/unsplash";
import useMediaQuery from "@/common/hooks/useMediaQuery";

interface PhotoDetailModal {
  photoId: string,
  onClose: () => void,

}

export const PhotoDetailModal = (props: PhotoDetailModal) => {
  const {photoId, onClose} = props
  const [photo, setPhoto] = useState<Basic>()
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    (async () => {
      try {
        if (!photoId) return
        const res = await UnsplashService.getPhotoDetail(photoId)
        setPhoto(res)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [photoId]);

  if (!photoId) return
  return <Modal
    styles={{modal: {maxWidth: "80dvw", width: "80dvw", maxHeight: "90dvh", height: "90dvh", overflow: "auto"}}}
    open={!!photoId} onClose={onClose}>
    <p>Photo</p>
    <div className={'md:w-full w-[70%] flex justify-center flex-col items-center'} style={{marginTop: "10px"}}>
      <LazyLoadImage
        src={photo?.urls?.full}
        alt={photo?.alt_description || ''}
        style={{height: "70dvh", borderRadius: "8px", objectFit: "cover",width:isMobile ? "100%" : "70%"}}
      />
      <div className={'items-start mt-6 flex flex-col gap-3'} style={{width:isMobile ? "100%" : "70%"}}>
        <h1 style={{fontSize: "20px", fontWeight: 500}}>
          <FontAwesomeIcon icon={faUser} className={'mr-2'}/>
          {photo?.user?.name}</h1>
        {photo?.user?.bio &&
            <p>
                <FontAwesomeIcon icon={faPenNib} className={'mr-2'}/>
              {photo?.user?.bio}
            </p>
        }
        {photo?.user?.twitter_username && <p>
            <FontAwesomeIcon icon={faTwitter} className={'mr-2'}/>
          {photo?.user?.twitter_username}
        </p>}
        <a href={photo?.user?.portfolio_url || ''} style={{textDecoration: "underline"}}>Portfolio url</a>
      </div>
    </div>
  </Modal>
}