import {UnsplashService} from "@/app/common/services/unsplash";
import {PhotoGallery} from "@/app/common/components/PhotoGallery";
import {CollectionList} from "@/app/common/components/CollectionList";

interface HomeProps {
  searchParams: { collection?: string }
}

async function getPhotos(collectionId?: string) {
  if (collectionId) {
    console.log({collectionId})
    return UnsplashService.getCollectionPhotos({collectionId: collectionId})
  }
  return UnsplashService.getPhotos();
}

async function getCollections() {
  return UnsplashService.getCollections()
}

export default async function Home(props: HomeProps) {
  const {searchParams: {collection}} = props
  const photosData = getPhotos(collection)
  const collectionsData = getCollections()
  const [photos, collections] = await Promise.all([photosData, collectionsData])
  if (!photos || !collections) return
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-24 py-10">
      <CollectionList collections={collections.results}/>
      <PhotoGallery images={photos?.results}/>
    </main>
  );
}
