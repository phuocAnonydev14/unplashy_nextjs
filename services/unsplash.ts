import { defineCancelApiObject } from '@/configs/axiosUtils';
import { Pagination } from '@/types/Pagination.type';
import { CategoryEnum } from '@/enums/CategoryEnum';
import { createApi } from 'unsplash-js';
import { UNSPLASH_ACCESS_KEY } from '@/constants/unsplash';

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

  getPhotos = async (pagination?: Pagination) => {
    return (await this.unsplash.photos.list(pagination)).response;
  };
  getCollections = async (pagination?: Pagination) => {
    return (await this.unsplash.collections.list(pagination)).response;
  };
  getCollectionPhotos = async (queries: GetCollectionPhotoQueries) => {
    return (await this.unsplash.collections.getPhotos(queries)).response;
  };
  getUser = async (username: string) => {
    return (await this.unsplash.users.get({ username })).response;
  };
  search = async (category: CategoryEnum, queries: SearchParams) => {
    console.log({ category, queries });
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
