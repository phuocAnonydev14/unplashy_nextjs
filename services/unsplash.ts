import { defineCancelApiObject } from '@/configs/axiosUtils';
import { Pagination } from '@/types/Pagination.type';
import { CategoryEnum } from '@/enums/CategoryEnum';
import { createApi } from 'unsplash-js';
import {
  UNSPLASH_ACCESS_KEY,
  UNSPLASH_ACCESS_KEY2,
  UNSPLASH_ACCESS_KEY3,
  UNSPLASH_ACCESS_KEy4,
  UNSPLASH_ACCESS_KEY5
} from '@/constants/unsplash';

interface SearchParams extends Pagination {
  query: string;
}

export interface GetCollectionPhotoQueries extends Pagination {
  collectionId: string;
}

export class UnsplashService {
  private unsplash;

  constructor() {
    this.unsplash = createApi({
      accessKey: UNSPLASH_ACCESS_KEY
    });
    defineCancelApiObject(this);
  }

  rotateApiKey = async () => {
    const keyList = [
      UNSPLASH_ACCESS_KEY,
      UNSPLASH_ACCESS_KEY2,
      UNSPLASH_ACCESS_KEY3,
      UNSPLASH_ACCESS_KEy4,
      UNSPLASH_ACCESS_KEY5
    ];
    this.unsplash = createApi({
      accessKey: keyList[Math.floor(Math.random() * keyList.length)]
    });
  };

  getPhotos = async (pagination?: Pagination) => {
    await this.rotateApiKey();
    return (await this.unsplash.photos.list(pagination)).response;
  };
  getCollections = async (pagination?: Pagination) => {
    await this.rotateApiKey();
    return (await this.unsplash.collections.list(pagination)).response;
  };
  getCollectionPhotos = async (queries: GetCollectionPhotoQueries) => {
    await this.rotateApiKey();
    return (await this.unsplash.collections.getPhotos(queries)).response;
  };
  getUser = async (username: string) => {
    return (await this.unsplash.users.get({ username })).response;
  };
  search = async (category: CategoryEnum, queries: SearchParams) => {
    await this.rotateApiKey();
    const searchQueriesFunc = {
      [CategoryEnum.PHOTO]: this.unsplash.search.getPhotos,
      [CategoryEnum.COLLECTION]: this.unsplash.search.getCollections,
      [CategoryEnum.USER]: this.unsplash.search.getUsers
    } as const;
    return (await searchQueriesFunc[category](queries)).response;
  };
  getCollectionDetail = async (collectionId: string) => {
    return (await this.unsplash.collections.get({ collectionId })).response;
  };
  getRecommend = async (collectionId: string) => {
    return (await this.unsplash.collections.getRelated({ collectionId })).response;
  };
  getPhotoDetail = async (photoId: string) => {
    return (await this.unsplash.photos.get({ photoId })).response;
  };
}

export const unsplashService = new UnsplashService();
