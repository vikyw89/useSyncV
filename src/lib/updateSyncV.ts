import { set, update } from "lodash-es";
import { emitChange, store } from "./helper";

/**
 * A function that updates data in the store synchronously using the specified selector and updates.
 *
 * @param {string} selector - The selector to use for updating data in the store.
 * @param {*} updates - The updates to be applied to the data in the store using the specified selector.
 * If updates is a function, it will receive the previous value of the data and must return the new value.
 *
 * @returns {*} - The updated data in the store using the specified selector and updates.
 */
export const updateSyncV = (selector: string, updates: any) => {
  if (typeof updates === "function") {
    const response = update(store, selector, updates);
    emitChange();
    return response;
  } else {
    const response = set(store, selector, updates);
    emitChange();
    return response;
  }
};