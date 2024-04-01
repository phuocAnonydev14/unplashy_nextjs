import { Basic } from 'unsplash-js/src/methods/photos/types';

export interface Collection {
  id: string;
  title: string;
  description: string;
}

export interface CollectionPhotos {
  photos: Basic[];
  id: string;
  title: string;
  description: string;
  user: { last_name: string; first_name: string };
  total_photos: number;
  tags: { title: string }[];
  cover_photo: { urls: { small: string } };
  preview_photos: Basic[];
}
