import {UnsplashService} from "@/app/common/services/unsplash";
import {PhotoGallery} from "@/app/common/components/PhotoGallery";
import {Collections} from "@/app/common/components/Collections";

async function getPhotos() {
  return UnsplashService.getPhotos();
}

async function getCollections() {
  return UnsplashService.getCollections()
}

export default async function Home() {
  const photosData =  getPhotos()
  const collectionsData = getCollections()
  const [photos,collections] = await Promise.all([photosData,collectionsData])
  if (!photos || !collections) return
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-24 py-10">
      <Collections collections={collections.results}/>
      <PhotoGallery images={photos?.results}/>
      {/*<CollectionList/>*/}
    </main>
  );
}
