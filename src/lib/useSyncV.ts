import { useSyncExternalStore } from 'react';
import { subscribe } from './helper.js';
import { getSyncV } from './getSyncV.js';

/**
 * A hook that provides synchronous access to the data in the store using the specified selector.
 *
 * @param selector - The selector to use for accessing data in the store.
 */
export const useSyncV = (selector: string)=> {
  const getSnapshot = () => {
    return JSON.stringify(getSyncV(selector))
  };

  const getServerSnapshot = () => {
    return JSON.stringify(getSyncV(selector))
  };

  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return getSyncV(selector)
};
