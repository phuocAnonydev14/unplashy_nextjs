'use client';

import { CollectionPhotos } from '@/types/Collection.type';
import { useEffect, useRef, useState } from 'react';
import styles from './CollectionBox.module.css';
import { useRouter } from 'next/navigation';
import { unsplashService } from '@/services/unsplash';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

interface CollectionBoxProps {
  collectionPhotos: CollectionPhotos;
}

export function CollectionBox(props: CollectionBoxProps) {
  const {
    collectionPhotos: {
      photos,
      title,
      id,
      user: { last_name, first_name },
      total_photos,
      tags,
      preview_photos
    }
  } = props;
  const containerRef = useRef<any>(null);
  const router = useRouter();
  const [photoMapper, setPhotoMapper] = useState(photos);

  useEffect(() => {
    (async () => {
      if (photos.length > 5) {
        return;
      }
      // const photoResponse = await unsplashService.getPhotos({ page: 2, perPage: 120 });
      // setPhotoMapper((prevState) => [...prevState, ...(photoResponse?.results || [])]);
    })();
  }, [photos]);

  // if (!photos.length) return

  return (
    <div className={`my-10 relative ${styles.container} w-[30%]`}>
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-hidden pb-2 scroll-smooth cursor-pointer"
        onClick={() => router.push(`/collections/${id}`)}
      >
        <div className="flex gap-1 overflow-hidden rounded-[20px]">
          <div>
            <Image
              src={preview_photos[0]?.urls.small || '/images/default-img.png'}
              alt={photos[0]?.alt_description || ''}
              objectFit="cover"
              height="300"
              width="300"
              className="h-[305px] object-cover"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Image
              src={preview_photos[1]?.urls.small || '/images/default-img.png'}
              alt={photos[1]?.alt_description || ''}
              objectFit="cover"
              height="150"
              className="object-cover h-[150px] "
              width="150"
            />
            <Image
              src={preview_photos[2]?.urls.small || '/images/default-img.png'}
              alt={photos[2]?.alt_description || ''}
              objectFit="cover"
              height="150"
              className="object-cover h-[150px]"
              width="150"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <h2 className="font-semibold mb-2" style={{ fontSize: '20px' }}>
          {title}
        </h2>
        {/*<Button variant="secondary" onClick={() => router.push(`/collections/${id}`)}>*/}
        {/*  See all*/}
        {/*</Button>*/}
      </div>
      <div className="flex gap-2 items-center">
        <p className="text-[14px] font-semibold text-gray-700">{total_photos}</p> •{' '}
        <p className="text-[14px] font-semibold text-gray-700">
          Curated by {`${first_name} ${last_name}`}
        </p>
      </div>
      <div className="flex gap-2 my-3  flex-wrap ">
        {tags.map(({ title }) => {
          return (
            <Badge className="w-auto" key={title} variant="secondary">
              {title}
            </Badge>
          );
        })}
      </div>
      <div className={`${styles.divider}`}></div>
    </div>
  );
}
