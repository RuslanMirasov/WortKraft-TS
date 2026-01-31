'use client';

import { useCallback, useRef, useState } from 'react';

type UseRequestOptions<T> = {
  onSuccess?: (result: T) => void;
  onError?: (error: unknown) => void;
  preventParallel?: boolean;
};

export function useRequest<TArgs extends any[], TResult>(
  request: (...args: TArgs) => Promise<TResult>,
  options?: UseRequestOptions<TResult>
) {
  const [loading, setLoading] = useState(false);
  const inFlight = useRef(false);

  const run = useCallback(
    async (...args: TArgs) => {
      if (options?.preventParallel && inFlight.current) {
        return;
      }

      inFlight.current = true;
      setLoading(true);

      try {
        const result = await request(...args);
        options?.onSuccess?.(result);
        return result;
      } catch (error) {
        options?.onError?.(error);
        throw error;
      } finally {
        inFlight.current = false;
        setLoading(false);
      }
    },
    [request, options]
  );

  return { run, loading };
}
