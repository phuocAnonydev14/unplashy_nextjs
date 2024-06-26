import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface SearchInputProps {
  query: string;
  onChangeQuery: (val: string) => void;
  loading: boolean;
}

export const SearchInput = (props: SearchInputProps) => {
  const { query, onChangeQuery, loading } = props;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = async () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('q', query);
    router.push(pathname + '?' + params.toString());
  };

  return (
    <div className="flex justify-center gap-3 relative">
      <div className="relative">
        <Input
          value={query}
          onChange={(e) => onChangeQuery(e.target.value)}
          className="max-w-[500px] min-w-96 pl-[35px]"
          type="search"
          placeholder="Search photo..."
        ></Input>
        <Button
          onClick={handleSearch}
          disabled={loading}
          variant="link"
          className="flex justify-center gap-1 items-center absolute left-[-2%] top-0"
        >
          {!loading ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path d="M 9 2 C 5.1458495 2 2 5.1458524 2 9 C 2 12.854148 5.1458495 16 9 16 C 10.747999 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 20 22 L 22 20 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747997 16 9 C 16 5.1458524 12.854151 2 9 2 z M 9 4 C 11.773271 4 14 6.2267307 14 9 C 14 11.773269 11.773271 14 9 14 C 6.226729 14 4 11.773269 4 9 C 4 6.2267307 6.226729 4 9 4 z"></path>
            </svg>
          ) : (
            <div className="loader"></div>
          )}
        </Button>
      </div>
    </div>
  );
};
