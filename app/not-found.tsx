import Image from 'next/image';

export default function NotFoundPage() {
  return (
    <div className="h-[80dvh] flex justify-center items-center">
      <Image width={600} height={700} src="/images/page-not-found.png" alt="page not found" />
    </div>
  );
}
