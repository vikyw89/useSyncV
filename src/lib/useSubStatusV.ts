import { useSyncExternalStore } from 'react';
import { getSubStatusV } from './getSubStatusV.js';
import { subscribe } from './helper.js';

/**
 * A hook that provides synchronous access to the data in the store using the specified selector.
 *
 * @param selector - The selector to use for accessing data in the store.
 */
export const useSubStatusV = (selector: string) => {
  const getSnapshot = () => {
    return JSON.stringify(getSubStatusV(selector))
  };

  const getServerSnapshot = () => {
    return JSON.stringify(getSubStatusV(selector))
  };

  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return getSubStatusV(selector)
};
