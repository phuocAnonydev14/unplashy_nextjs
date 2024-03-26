'use client'
import Modal from 'react-responsive-modal';
import "react-responsive-modal/styles.css";
import {useEffect, useState} from "react";
import {UnsplashService} from "@/app/common/services/unsplash";
import {Basic} from "unsplash-js/src/methods/photos/types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {faTwitter} from "@fortawesome/free-brands-svg-icons";

interface PhotoDetailModal {
  photoId: string,
  onClose: () => void,

}

export const PhotoDetailModal = (props: PhotoDetailModal) => {
  const {photoId, onClose} = props
  const [photo, setPhoto] = useState<Basic>()
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
    <div className={'flex justify-center flex-col items-center'}>
      <img loading={"lazy"} src={photo?.urls?.full} alt=""
           style={{width: "70%", height: "70dvh", borderRadius: "8px", objectFit: "cover"}}/>
      <div className={'items-start mt-6 flex flex-col gap-2'} style={{width: "70%"}}>
        <h1 style={{fontSize: "20px", fontWeight: 500}}>
          <FontAwesomeIcon icon={faUser} className={'mr-2'}/>
          {photo?.user?.name}</h1>
        <p>{photo?.user?.bio}</p>
        {photo?.user?.twitter_username && <p>
            <FontAwesomeIcon icon={faTwitter} className={'mr-2'}/>
          {photo?.user?.twitter_username}
        </p>}
        <a href={photo?.user?.portfolio_url || ''} style={{textDecoration: "underline"}}>Portfolio url</a>
      </div>
    </div>
  </Modal>
}