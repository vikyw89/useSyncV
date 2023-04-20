import { update } from "lodash-es";
import { emitChange, store } from "./helper.js";

/**
 * A function that creates new data in the store synchronously using the specified selector and value.
 *
 * @param {string} selector - The selector to use for creating new data in the store.
 * @param {*} value - The value to be added to the store using the specified selector.
 *
 * @returns {*} - The data that was created in the store using the specified selector and value.
 */
export const createSyncV = (selector: string, value: any) => {
  const response: any = update(store, selector, (p: any) => {
    if (Array.isArray(p)) {
      return [...p, value];
    }
    return [value];
  });
  emitChange();
  return response;
};
