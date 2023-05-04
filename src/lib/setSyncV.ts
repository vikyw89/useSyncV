import { result, update } from 'lodash-es';
import { emitChange, store } from './helper.js';

/**
 * A function that updates data in the store synchronously using the specified selector and updates.
 *
 * @param  selector - The selector to use for updating data in the store.
 * @param  updates - The updates to be applied to the data in the store using the specified selector.
 * @returns updated value
 * If updates is a function, it will receive the previous value of the data and must return the new value.
 */
export function setSyncV(
  selector: string,
  updates: unknown | ((p: unknown) => unknown),
) {
  if (typeof updates === 'function') {
    update(store, selector, updates as (p: unknown) => unknown) as unknown
  } else {
    update(store, selector, () => updates) as unknown
  }
  emitChange();
  return result(store, selector)
}
