import {Button} from "@/components/ui/button";
import {UnsplashService} from "@/app/common/services/unsplash";
import {CollectionList} from "@/app/common/components/CollectionList";

async function getPhotos() {
  return UnsplashService.getPhotos();
}

export default async function Home() {
  const data = await getPhotos()
  console.log({data})
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button>Click me</Button>
      {JSON.stringify(data.response)}
      <CollectionList/>
    </main>
  );
}
