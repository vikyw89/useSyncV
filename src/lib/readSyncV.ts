import { getSyncV } from './getSyncV.js';

/**
 * A function that reads data from the store synchronously using the specified selector.
 *
 * @param selector - The selector to use for reading data from the store.
 */
export function readSyncV(selector: string) {
  return getSyncV(selector)
}
