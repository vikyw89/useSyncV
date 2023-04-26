import { result } from 'lodash-es';
import { store } from './helper.js';
/**
 * A function that reads data from the store synchronously using the specified selector.
 *
 * @param selector - The selector to use for reading data from the store.
 */
export function readSyncV(selector) {
    const response = result(store, selector);
    return response;
}
