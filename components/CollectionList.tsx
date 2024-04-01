'use client';
import { Collection } from '@/types/Collection.type';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Each } from '@/components/shared-components/Each';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';

interface CollectionsProps {
  collections: Collection[];
  isSearch?: boolean;
}

export const CollectionList = (props: CollectionsProps) => {
  const { collections, isSearch } = props;
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const containerRef = useRef<any>(null);

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

  const handleChooseCollection = async (collectionId?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!collectionId) {
      params.delete('collection');
    } else {
      params.set('collection', collectionId);
    }
    router.push(pathname + '?' + params.toString());
  };

  return (
    <div className="relative">
      {showLeftArrow && (
        <div
          style={{
            background:
              'linear-gradient(90deg, rgba(255,253,253,1) 0%, rgba(255,255,255,0.8940826330532213) 91%, rgba(255,255,255,0.02573529411764708) 100%)'
          }}
          className="absolute left-[-20px] top-[-6px] w-24 h-14 rounded-bl flex items-center justify-center  transition-opacity"
          onClick={() => handleScroll(-200)}
        >
          <FontAwesomeIcon
            size="xl"
            className="opacity-50 hover:opacity-100 cursor-pointer"
            icon={faAngleLeft}
          />
        </div>
      )}
      <div
        ref={containerRef}
        className="flex gap-3 mb-10  max-w-[90dvw] pb-1 overflow-x-hidden scroll-smooth"
      >
        {!isSearch && (
          <Button
            onClick={() => handleChooseCollection()}
            variant={!searchParams.get('collection') ? 'default' : 'secondary'}
            className=""
            key="discover"
          >
            Discover
          </Button>
        )}
        <Each<Collection>
          render={({ title, id }) => {
            return (
              <Button
                onClick={() => handleChooseCollection(id)}
                variant={searchParams.get('collection') === id ? 'default' : 'secondary'}
                className=""
                key={id}
              >
                {title}
              </Button>
            );
          }}
          of={collections}
        />
      </div>
      {showRightArrow && (
        <div
          style={{
            background:
              'linear-gradient(90deg, rgba(255,253,253,0.06214985994397759) 0%, rgba(255,255,255,0.8632703081232493) 14%, rgba(255,255,255,1) 100%)'
          }}
          className="absolute right-[-40px] top-[-6px] w-28 h-14 rounded-bl flex items-center justify-center  transition-opacity"
          onClick={() => handleScroll(200)}
        >
          <FontAwesomeIcon
            size="xl"
            className="opacity-50 hover:opacity-100 cursor-pointer"
            icon={faAngleRight}
          />
        </div>
      )}
    </div>
  );
};
