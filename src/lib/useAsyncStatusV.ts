import { result } from 'lodash-es';
import { useSyncExternalStore } from 'react';
import { asyncStore, store, subscribe } from './helper.js';
import { getSyncV } from './getSyncV.js';

/**
 * A hook that provides synchronous access to the data in the store using the specified selector.
 *
 * @param selector - The selector to use for accessing data in the store.
 */
export const useAsyncStatusV = (selector: string) unknown => {
  const getSnapshot = () => {
    return JSON.stringify(result(asyncStore, selector));
  };

  const getServerSnapshot = () => {
    return JSON.stringify(result(asyncStore, selector));
  };

  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return getSyncV(selector)
};
