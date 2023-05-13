import { useAsyncStatusV } from './useAsyncStatusV.js';
import { useSyncV } from './useSyncV.js';

/**
 * A custom hook for managing asynchronous data in an external store with synchronous state.
 *
 * @param selector - The selector for the asynchronous data.
 */
export const useAsyncV = (selector: string) => {
  const asyncState = useAsyncStatusV(selector)
  const data = useSyncV(selector)

  return {
    ...asyncState,
    data:data,
  }
};
