'use client';
import { Each } from '@/components/shared-components/Each';
import { Skeleton } from '@/components/ui/skeleton';
import useMediaQuery from '@/hooks/useMediaQuery';
import Image from 'next/image';

export const SkeletonLoading = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className="wrapper">
      <Each<number>
        render={(item, index) => (
          <div
            style={{ cursor: 'zoom-in' }}
            className="gallery-container min-w-[200px] w-auto gc-1 gr-3"
            key={item}
          >
            <div className="gallery-item">
              <div className="image">
                <Skeleton className="min-h-[500px] min-w-[350px] w-[100%] rounded-xl" />
              </div>
            </div>
          </div>
        )}
        of={Array.from({ length: isMobile ? 2 : 4 })}
      />
    </div>
  );
};
