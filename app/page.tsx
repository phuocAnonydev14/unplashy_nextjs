import {UnsplashService} from "@/common/services/unsplash";
import {PhotoGallery} from "@/common/components/PhotoGallery";
import {CollectionList} from "@/common/components/CollectionList";

interface HomeProps {
  searchParams: { collection?: string }
}

async function getPhotos(collectionId?: string) {
  try {
    if (collectionId) {
      return UnsplashService.getCollectionPhotos({collectionId: collectionId})
    }
    return UnsplashService.getPhotos();
  } catch (e) {
    console.log({e})
  }

  return {results: []}
}

async function getCollections() {
  try {
    return UnsplashService.getCollections()
  } catch (e) {
    console.log({e})
  }

  return {results: []}
}

export default async function Home(props: HomeProps) {
  const {searchParams: {collection}} = props
  const photosData = getPhotos(collection)
  const collectionsData = getCollections()
  const [photos, collections] = await Promise.all([photosData, collectionsData])
  if (!photos || !collections) return
  return (
    <main className="flex min-h-screen flex-col items-center lg:px-24 md:px-14 sm:px-10 px-5 py-10 gap-10">
      <CollectionList collections={collections.results}/>
      <PhotoGallery images={photos?.results}/>
    </main>
  );
}
