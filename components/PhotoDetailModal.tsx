'use client';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { useEffect, useState } from 'react';
import { Basic } from 'unsplash-js/src/methods/photos/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenNib, faUser } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { unsplashService } from '@/services/unsplash';
import useMediaQuery from '@/hooks/useMediaQuery';
import { useToast } from '@/components/ui/use-toast';
import useRequest from '@/hooks/useApiRequest';
import Image from 'next/image';

interface PhotoDetailModal {
  photoId: string;
  onClose: () => void;
}

export const PhotoDetailModal = (props: PhotoDetailModal) => {
  const { photoId, onClose } = props;
  const [photo, setPhoto] = useState<Basic>();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { toast } = useToast();
  const [{ loading }, doFetchPhoto] = useRequest(unsplashService.getPhotoDetail);

  useEffect(() => {
    (async () => {
      try {
        if (!photoId) return;
        const res = await doFetchPhoto(photoId);
        setPhoto(res);
      } catch (e) {
        console.log(e);
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.'
          // action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    })();
  }, [photoId]);

  if (!photo || loading) return;
  return (
    <Modal
      styles={{
        modal: {
          maxWidth: '80dvw',
          width: '80dvw',
          maxHeight: '90dvh',
          height: '90dvh',
          overflow: 'auto'
        }
      }}
      open={!!photoId}
      onClose={onClose}
    >
      <p className={'font-semibold'}>Photo</p>
      <div
        className={'md:w-full flex justify-center flex-col items-center'}
        style={{ marginTop: '10px' }}
      >
        <Image
          src={photo?.urls?.full || '/images/default-img.png'}
          alt={photo?.alt_description || ''}
          style={{
            height: '70dvh',
            borderRadius: '8px',
            objectFit: 'cover',
            width: isMobile ? '100%' : '70%'
          }}
          width={800}
          height={600}
        />
        <div
          className={'items-start mt-6 flex flex-col gap-3'}
          style={{ width: isMobile ? '100%' : '70%' }}
        >
          {photo?.user?.name && (
            <h1 style={{ fontSize: '20px', fontWeight: 500 }}>
              <FontAwesomeIcon icon={faUser} className={'mr-2'} />
              {photo?.user?.name}
            </h1>
          )}
          {photo?.user?.bio && (
            <p>
              <FontAwesomeIcon icon={faPenNib} className={'mr-2'} />
              {photo?.user?.bio}
            </p>
          )}
          {photo?.user?.twitter_username && (
            <p>
              <FontAwesomeIcon icon={faTwitter} className={'mr-2'} />
              {photo?.user?.twitter_username}
            </p>
          )}
          <a href={photo?.user?.portfolio_url || ''} style={{ textDecoration: 'underline' }}>
            Portfolio url
          </a>
        </div>
      </div>
    </Modal>
  );
};
