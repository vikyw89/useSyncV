import { result } from 'lodash-es';
import { subStatusStore } from './helper.js';
/**
 * A function that reads data from the store synchronously using the specified selector.
 *
 * @param selector - The selector to use for reading data from the store.
 */
export function getSubStatus(selector) {
    const response = result(subStatusStore, selector);
    return response;
}
//# sourceMappingURL=getSubStatus.js.map