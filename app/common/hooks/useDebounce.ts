import {useState, useEffect} from 'react';
import {useRouter, useSearchParams} from "next/navigation";

export function useDebounce<T>(
  initialValue: T,
  time: number
) {
  const [value, setValue] = useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const debounce = setTimeout(() => {
      setDebouncedValue(value);
      setLoading(false)
    }, time);
    return () => {
      clearTimeout(debounce);
    };
  }, [value, time]);
  return [{debouncedValue, value, loading}, {setValue, setDebouncedValue}] as const;
}