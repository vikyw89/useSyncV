import { unset } from "lodash-es";
import { emitChange, store } from "./helper.js";

/**
 * A function that deletes data from the store synchronously using the specified selector.
 *
 * @param {string} selector - The selector to use for deleting data from the store.
 *
 * @returns {*} - The data that was deleted from the store using the specified selector.
 */
export const deleteSyncV = (selector: string): any => {
  const response = unset(store, selector);
  emitChange();
  return response;
};
