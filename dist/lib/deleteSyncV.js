import { unset } from 'lodash-es';
import { emitChange, syncStore } from './helper.js';
/**
 * A function that deletes data from the syncStore synchronously using the specified selector.
 *
 * @param  selector - The selector to use for deleting data from the syncStore.
 *
 */
export function deleteSyncV(selector) {
    const response = unset(syncStore, selector);
    emitChange();
    return response;
}
//# sourceMappingURL=deleteSyncV.js.map