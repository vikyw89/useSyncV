import { result, update } from 'lodash-es';
import { asyncStatusStore } from './helper.js';


export type defaultAsyncStatus = {
  loading: boolean
  error: null | object,
  refetch: boolean
}

export const defaultAsyncStatus = {
  loading: false,
  error: null,
  refetch: true
}

/**
 * A function that reads data from the asyncStatus store and return the async state of the selector
 *
 * @param selector - The selector to use for reading data from the store.
 */
export function getAsyncStatusV(selector: string) {
  const data = result(asyncStatusStore, selector) as defaultAsyncStatus

  if (!data) {
    return update(asyncStatusStore, selector, () => ({ ...defaultAsyncStatus, refetch: false })) as defaultAsyncStatus
  }

  return data;
}
