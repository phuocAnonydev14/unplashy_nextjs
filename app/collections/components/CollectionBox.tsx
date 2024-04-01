'use client';

import { CollectionPhotos } from '@/types/Collection.type';
import { Each } from '@/components/shared-components/Each';
import { useEffect, useRef, useState } from 'react';
import styles from './CollectionBox.module.css';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { unsplashService } from '@/services/unsplash';

interface CollectionBoxProps {
  collectionPhotos: CollectionPhotos;
}

export function CollectionBox(props: CollectionBoxProps) {
  const {
    collectionPhotos: { photos, title, id }
  } = props;
  const containerRef = useRef<any>(null);
  const router = useRouter();
  const [photoMapper, setPhotoMapper] = useState(photos);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    (async () => {
      if (photos.length > 5) {
        return;
      }
      const photoResponse = await unsplashService.getPhotos({ page: 2, perPage: 120 });
      setPhotoMapper((prevState) => [...prevState, ...(photoResponse?.results || [])]);
    })();
  }, [photos]);

  const handleScroll = (scrollOffset: number) => {
    containerRef.current.scrollLeft += scrollOffset;
  };

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (container) {
        setShowLeftArrow(container.scrollLeft > 0);
        setShowRightArrow(container.scrollLeft + 1 < container.scrollWidth - container.clientWidth);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll();
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  if (!photos.length) return;

  return (
    <div className={`my-10 relative ${styles.container}`}>
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold mb-2" style={{ fontSize: '20px' }}>
          {title}
        </h2>
        <Button variant="secondary" onClick={() => router.push(`/collections/${id}`)}>
          See all
        </Button>
      </div>
      <div className={`${styles.divider}`}></div>
      {showLeftArrow && (
        <Button
          className={styles.arrowLeft}
          onClick={() => handleScroll(-200)}
          variant="outline"
          size="icon"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path d="m12.718 4.707-1.413-1.415L2.585 12l8.72 8.707 1.413-1.415L6.417 13H20v-2H6.416l6.302-6.293z" />
          </svg>
        </Button>
      )}
      <div ref={containerRef} className="flex gap-4 overflow-x-auto pb-2 scroll-smooth">
        <Each
          render={({ urls: { small }, alt_description }) => {
            return (
              <img
                src={small}
                alt={alt_description || ''}
                style={{ borderRadius: '8px', objectFit: 'cover', height: '200px', width: '400px' }}
              />
            );
          }}
          of={photoMapper}
        />
      </div>
      <Button
        className={styles.arrowRight}
        onClick={() => handleScroll(200)}
        variant="outline"
        size="icon"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path d="M11.293 4.707 17.586 11H4v2h13.586l-6.293 6.293 1.414 1.414L21.414 12l-8.707-8.707-1.414 1.414z" />
        </svg>
      </Button>
    </div>
  );
}
