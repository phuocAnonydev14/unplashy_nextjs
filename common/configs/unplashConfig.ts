import { createApi } from 'unsplash-js';
import { UNSPLASH_ACCESS_KEY } from '@/common/constants/unsplash';

export const unsplash = createApi({
  accessKey: UNSPLASH_ACCESS_KEY
});
