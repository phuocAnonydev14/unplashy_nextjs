import {unsplash} from "@/app/common/configs/unplashConfig";
import {defineCancelApiObject} from "@/app/common/configs/axiosUtils";
import {Pagination} from "@/app/common/types/Pagination.type";
import {CategoryEnum} from "@/app/common/enums/CategoryEnum";

interface SearchParams extends Pagination {
  query: string
}

const searchQueriesFunc = {
  [CategoryEnum.PHOTO]: unsplash.search.getPhotos,
  [CategoryEnum.COLLECTION]: unsplash.search.getCollections,
  [CategoryEnum.USER]: unsplash.search.getUsers,
} as const

export const UnsplashService = {
  getPhotos: async (pagination?: Pagination) => {
    const res = await unsplash.photos.list(pagination)
    console.log(res)
    return res
  },
  getCollections: async (pagination?: Pagination) => {
    return unsplash.collections.list(pagination)
  },
  getUser: async (username: string) => {
    return unsplash.users.get({username})
  },
  search: async (category: CategoryEnum, queries: SearchParams) => {
    return searchQueriesFunc[category](queries)
  }
}

defineCancelApiObject(UnsplashService)



