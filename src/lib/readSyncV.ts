import { result } from "lodash-es";
import { store } from "./helper.js";

/**
 * A function that reads data from the store synchronously using the specified selector.
 *
 * @param {string} selector - The selector to use for reading data from the store.
 *
 * @returns {*} - The data read from the store using the specified selector.
 */
export const readSyncV = (selector: string): any => {
  const response: any = result(store, selector);
  return response;
};
