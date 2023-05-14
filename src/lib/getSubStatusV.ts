import { result } from 'lodash-es';
import { subStatusStore } from './helper.js';

export const defaultSubStatus = {
  refetch: false
}

/**
 * A function that reads data from the store synchronously using the specified selector.
 *
 * @param selector - The selector to use for reading data from the store.
 */
export function getSubStatusV(selector: string) {
  const response = result(subStatusStore, selector, defaultSubStatus);
  return response;
}
