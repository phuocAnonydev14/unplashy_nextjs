'use client';

import { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';
import { Separator } from '@/components/ui/separator';
import { CategoryEnum } from '@/enums/CategoryEnum';
import { PhotoGallery } from '@/components/PhotoGallery';
import { CollectionList } from '@/components/CollectionList';
import { unsplashService } from '@/services/unsplash';
import { Basic } from 'unsplash-js/src/methods/photos/types';
import { SearchInput } from '@/app/search/components/SearchInput';
import { useSearch } from '@/app/search/useSearch';

export default function SearchPage() {
  const [
    { debouncedValue: debouncedSearchVal, value: searchVal, loading },
    { setValue: setSearchVal, setDebouncedValue }
  ] = useDebounce('', 1000);
  const [{ searchResults, searchCollectionResults }, { handleSearch }] =
    useSearch(debouncedSearchVal);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q');
  const onChangeQuery = (val: string) => {
    setSearchVal(val);
  };

  useEffect(() => {
    if (searchQuery) {
      setDebouncedValue(searchQuery);
      setSearchVal(searchQuery);
    }
  }, [searchQuery]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('q', debouncedSearchVal);
    router.push(pathname + '?' + params.toString());
    handleSearch().then();
  }, [debouncedSearchVal]);

  return (
    <div className="text-center my-10">
      <SearchInput loading={loading} onChangeQuery={onChangeQuery} query={searchVal} />
      <h2 className="my-3 font-semibold text-[1.8rem]">{debouncedSearchVal || 'Popular'}</h2>
      <div className="flex h-5 items-center space-x-4 text-sm justify-center mt-2">
        {Object.values(CategoryEnum).map((val, index) => (
          <div key={val} className="flex space-x-4 h-5 items-center">
            {index !== 0 && <Separator orientation="vertical" />}
            <p className="mr-1">{val}</p>
          </div>
        ))}
      </div>
      <div className=" py-10 sm:px-16  md:px-20 xl:px-56 px-5">
        {!loading && searchResults && (
          <>
            <div className="flex justify-center mb-1">
              <CollectionList isSearch={true} collections={searchCollectionResults} />
            </div>
            <PhotoGallery
              searchAction={async (page: number) => {
                return ((
                  await unsplashService.search(CategoryEnum.PHOTO, {
                    page,
                    query: debouncedSearchVal
                  })
                )?.results || []) as Basic[];
              }}
              images={searchResults}
            />
          </>
        )}
      </div>
    </div>
  );
}
