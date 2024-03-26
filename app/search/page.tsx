'use client'

import {SearchInput} from "@/app/search/components/SearchInput";
import {useEffect, useState} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useDebounce} from "@/app/common/hooks/useDebounce";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {CategoryEnum} from "@/app/common/enums/CategoryEnum";
import {useSearch} from "@/app/search/useSearch";
import {PhotoGallery} from "@/app/common/components/PhotoGallery";
import {CollectionList} from "@/app/common/components/CollectionList";
import {UnsplashService} from "@/app/common/services/unsplash";
import {Basic} from "unsplash-js/src/methods/photos/types";

export default function SearchPage() {
  const [{
    debouncedValue: debouncedSearchVal,
    value: searchVal,
    loading
  }, {setValue: setSearchVal, setDebouncedValue}] = useDebounce('', 1000)
  const [selectedCate, setSelectedCate] = useState<CategoryEnum>(CategoryEnum.PHOTO)
  const [{searchResults, searchCollectionResults}, {handleSearch}] = useSearch(debouncedSearchVal, selectedCate)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('q')
  const onChangeQuery = (val: string) => {
    setSearchVal(val)
  }

  useEffect(() => {
    if (searchQuery) {
      setDebouncedValue(searchQuery)
      setSearchVal(searchQuery)
    }
  }, [searchQuery]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('q', debouncedSearchVal)
    router.push(pathname + '?' + params.toString())
    handleSearch().then()
  }, [debouncedSearchVal]);

  return <div className={'text-center my-10'}>
    <SearchInput loading={loading} onChangeQuery={onChangeQuery} query={searchVal}/>
    <h2 style={{fontSize: "1.8rem"}} className={'my-4 font-semibold'}>{debouncedSearchVal || 'Popular'}</h2>
    <div className="flex h-5 items-center space-x-4 text-sm justify-center mt-6">
      {Object.values(CategoryEnum).map((val, index) =>
        <div key={val} className={'flex space-x-4 h-5 items-center'}>
          {index !== 0 && <Separator orientation="vertical"/>}
          <Button onClick={() => setSelectedCate(val)}
                  variant={selectedCate === val ? "default" : "outline"}>{val}</Button>
        </div>)}
    </div>
    <div className={' py-20 sm:px-16  md:px-20 xl:px-56 px-10'}>
      {searchResults &&
          <>
              <div className={'flex justify-center'}>
                  <CollectionList isSearch={true} collections={searchCollectionResults}/>
              </div>
              <PhotoGallery
                  searchAction={async (page: number) => {
                    return ((await UnsplashService.search(CategoryEnum.PHOTO, {
                      page,
                      query: debouncedSearchVal
                    }))?.results || []) as Basic[]
                  }}
                  images={searchResults}
              />
          </>}
    </div>
  </div>
}