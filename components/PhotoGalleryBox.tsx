'use client';

import { useMemo } from 'react';
import Image from 'next/image';

interface PhotoGalleryBoxProps {
  id: string;
  url: string;
  description: string;
  handleClick: () => void;
}

function getRandomNumber(endNum = 1) {
  const randomNumber = Math.random();

  const numberInRange = randomNumber + endNum;

  // Làm tròn số (nếu cần)
  return Math.round(numberInRange);
}

export const PhotoGalleryBox = (props: PhotoGalleryBoxProps) => {
  const { url, id, description, handleClick } = props;

  const ranCol = useMemo(() => getRandomNumber(), []);
  const ranRow = useMemo(() => getRandomNumber(3), []);

  return (
    <div
      style={{ cursor: 'zoom-in' }}
      className={`gallery-container min-w-[200px] w-auto gc-1 gr-${ranRow}`}
      onClick={() => handleClick()}
      key={id}
    >
      <div className="gallery-item">
        <div className="image">
          <Image
            style={{ cursor: 'zoom-in' }}
            src={url}
            alt={description || ''}
            height={260}
            width={500}
            blurDataURL={url}
            placeholder="blur"
          />
        </div>
      </div>
    </div>
  );
};
