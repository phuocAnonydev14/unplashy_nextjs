import {unsplash} from "@/app/common/configs/unplashConfig";
import {defineCancelApiObject} from "@/app/common/configs/axiosUtils";
import {Pagination} from "@/app/common/types/Pagination.type";
import {CategoryEnum} from "@/app/common/enums/CategoryEnum";

interface SearchParams extends Pagination {
  query: string
}

export interface GetCollectionPhotoQueries extends Pagination {
  collectionId: string
}

const searchQueriesFunc = {
  [CategoryEnum.PHOTO]: unsplash.search.getPhotos,
  [CategoryEnum.COLLECTION]: unsplash.search.getCollections,
  [CategoryEnum.USER]: unsplash.search.getUsers,
} as const

export const UnsplashService = {
  getPhotos: async (pagination?: Pagination) => {
    return (await unsplash.photos.list(pagination)).response
  },
  getCollections: async (pagination?: Pagination) => {
    return (await unsplash.collections.list(pagination)).response
  },
  getCollectionPhotos: async (queries: GetCollectionPhotoQueries) => {
    return (await unsplash.collections.getPhotos(queries)).response
  },
  getUser: async (username: string) => {
    return (await unsplash.users.get({username})).response
  },
  search: async (category: CategoryEnum, queries: SearchParams) => {
    return (await searchQueriesFunc[category](queries)).response
  },
  getCollectionDetail: async (collectionId: string) => {
    return (await unsplash.collections.get({collectionId})).response
  },
  getRecommend: async (collectionId: string) => {
    return (await unsplash.collections.getRelated({collectionId})).response
  }
}

defineCancelApiObject(UnsplashService)



