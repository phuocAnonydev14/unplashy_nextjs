'use client';
import { Each } from '@/components/shared-components/Each';
import { Skeleton } from '@/components/ui/skeleton';
import useMediaQuery from '@/hooks/useMediaQuery';

export const SkeletonLoading = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Each<number>
      render={(item, index) => (
        <div key={item} className="flex flex-col space-y-4">
          <Skeleton
            className="min-h-[300px] min-w-[400px] rounded-xl mt-2"
            style={{ minHeight: '300px', width: isMobile ? '300px' : '420px' }}
          />
        </div>
      )}
      of={Array.from({ length: 3 })}
    />
  );
};
