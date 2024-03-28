import { CategoryEnum } from '@/common/enums/CategoryEnum';
import { UnsplashService } from '@/common/services/unsplash';
import { useState } from 'react';

export const useSearch = (query: string) => {
  const [searchResults, setSearchResults] = useState<any>();
  const [searchCollectionResults, setSearchCollectionResults] = useState<any>();

  const handleSearch = async () => {
    try {
      const [searchPhotoResponse, searchCollectionResponse] = await Promise.all([
        UnsplashService.search(CategoryEnum.PHOTO, { query }),
        await UnsplashService.search(CategoryEnum.COLLECTION, { query })
      ]);
      // const searchPhotoResponse = await UnsplashService.search(CategoryEnum.PHOTO, {query})
      setSearchResults(searchPhotoResponse?.results || []);
      setSearchCollectionResults(searchCollectionResponse?.results || []);
      // const searchCollectionResponse = await UnsplashService.search(CategoryEnum.COLLECTION, {query})
    } catch (e) {
      console.log(e);
    }
  };

  return [{ searchResults, searchCollectionResults }, { handleSearch }] as const;
};
