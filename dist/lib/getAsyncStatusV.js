import { result } from 'lodash-es';
import { asyncStatusStore } from './helper.js';
export const defaultAsyncStatus = {
    loading: false,
    error: null
};
/**
 * A function that reads data from the asyncStatus store and return the async state of the selector
 *
 * @param selector - The selector to use for reading data from the store.
 */
export function getAsyncStatusV(selector) {
    const data = result(asyncStatusStore, selector, {
        loading: false,
        error: null
    });
    return data;
}
//# sourceMappingURL=getAsyncStatusV.js.map