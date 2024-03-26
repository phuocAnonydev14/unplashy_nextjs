import {Basic} from "unsplash-js/src/methods/photos/types";

export interface Collection {
  id: string,
  title: string,
  description: string,
}

export interface CollectionPhotos {
  photos: Basic[];
  id: string;
  title: string;
  description: string;
}