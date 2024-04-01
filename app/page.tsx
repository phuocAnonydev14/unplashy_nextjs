import { unsplashService } from '@/services/unsplash';
import { PhotoGallery } from '@/components/PhotoGallery';
import { CollectionList } from '@/components/CollectionList';

interface HomeProps {
  searchParams: { collection?: string };
}

async function getPhotos(collectionId?: string) {
  try {
    let photos;
    if (collectionId) {
      photos = await unsplashService.getCollectionPhotos({ collectionId: collectionId });
    } else photos = await unsplashService.getPhotos();
    return photos;
  } catch (e) {
    console.log({ e });
  }

  return { results: [] };
}

async function getCollections() {
  try {
    const collections = await unsplashService.getCollections();
    return collections;
  } catch (e) {
    console.log({ e });
  }

  return { results: [] };
}

export default async function Home(props: HomeProps) {
  const {
    searchParams: { collection }
  } = props;
  const photosData = getPhotos(collection);
  const collectionsData = getCollections();
  const [photos, collections] = await Promise.all([photosData, collectionsData]);
  if (!photos || !collections) return;
  return (
    <main className="flex min-h-screen flex-col items-center lg:px-20 md:px-10 sm:px-10 px-5 py-10 gap-1">
      <CollectionList collections={collections.results} />
      <PhotoGallery images={photos?.results} />
    </main>
  );
}
