import {useState} from 'react';

type Callback = (...args: any[]) => any;

const useRequest = <T, K>(fn: Callback) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const caller = async (args: K): Promise<any> => {
    setData(undefined);
    setError(undefined);
    setLoading(true)
    try {
      const response = await fn(args);
      setData(() => response);
      return response;
    } catch (error: any) {
      setData(undefined);
      setError(() => error);
      throw error;
    } finally {
      setLoading(false)
    }
  };

  const reset = () => {
    setData(undefined);
    setError(undefined);
  };

  return [{data, error, loading}, caller, reset] as const;
};

export default useRequest;