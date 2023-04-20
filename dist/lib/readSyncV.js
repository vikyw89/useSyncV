import { result } from "lodash-es";
import { store } from "./helper";
/**
 * A function that reads data from the store synchronously using the specified selector.
 *
 * @param {string} selector - The selector to use for reading data from the store.
 *
 * @returns {*} - The data read from the store using the specified selector.
 */
export var readSyncV = function (selector) {
    var response = result(store, selector);
    return response;
};
