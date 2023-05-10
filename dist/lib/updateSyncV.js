import { setSyncV } from './setSyncV.js';
/**
 * A function that updates data in the store synchronously using the specified selector and updates.
 *
 * @param  selector - The selector to use for updating data in the store.
 * @param  updates - The updates to be applied to the data in the store using the specified selector.
 * @returns updated value
 * If updates is a function, it will receive the previous value of the data and must return the new value.
 */
export function updateSyncV(selector, updates) {
    return setSyncV(selector, updates);
}
//# sourceMappingURL=updateSyncV.js.map