'use client';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenNib, faUser } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useEffect, useState } from 'react';
import { Basic } from 'unsplash-js/src/methods/photos/types';
import useMediaQuery from '@/hooks/useMediaQuery';
import { useToast } from '@/components/ui/use-toast';
import useRequest from '@/hooks/useApiRequest';
import { unsplashService } from '@/services/unsplash';
import { useParams } from 'next/navigation';

export default function PhotoDetailPage() {
  const { photoId } = useParams();
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

  if (!photo) return;

  return (
    <div>
      <div className="md:w-full flex justify-center flex-col items-center mt-[10px]">
        <Image
          placeholder="blur"
          src={photo?.urls?.full || ''}
          alt={photo?.alt_description || ''}
          width={400}
          height={800}
          className={`h-[80px] rounded-[8px] object-cover ${isMobile ? 'w-100%' : 'w-46%'}`}
          blurDataURL={photo?.urls?.small}
        />
        <div className={`items-start mt-6 flex flex-col gap-3 ${isMobile ? 'w-100%' : 'w-70%'}`}>
          {photo?.user?.name && (
            <h1>
              <FontAwesomeIcon icon={faUser} className="mr-2 text-[20px] font-semibold" />
              {photo?.user?.name}
            </h1>
          )}
          {photo?.user?.bio && (
            <p>
              <FontAwesomeIcon icon={faPenNib} className="mr-2" />
              {photo?.user?.bio}
            </p>
          )}
          {photo?.user?.twitter_username && (
            <p>
              <FontAwesomeIcon icon={faTwitter} className="mr-2" />
              {photo?.user?.twitter_username}
            </p>
          )}
          <a href={photo?.user?.portfolio_url || ''} className="underline">
            Portfolio url
          </a>
        </div>
      </div>
    </div>
  );
}
