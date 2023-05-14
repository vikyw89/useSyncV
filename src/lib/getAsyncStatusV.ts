import { result } from 'lodash-es';
import { asyncStatusStore } from './helper.js';


export type defaultAsyncStatus = {
  loading: boolean
  error: null | object
}

export const defaultAsyncStatus = {
  loading: false,
  error: null
}

/**
 * A function that reads data from the asyncStatus store and return the async state of the selector
 *
 * @param selector - The selector to use for reading data from the store.
 */
export function getAsyncStatusV(selector: string) {
  const data = result(asyncStatusStore, selector, {
    loading: false,
    error: null
  }) as defaultAsyncStatus

  return data;
}
