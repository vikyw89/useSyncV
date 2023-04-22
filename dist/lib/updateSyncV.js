import { set, update } from "lodash-es";
import { emitChange, store } from "./helper.js";
/**
 * A function that updates data in the store synchronously using the specified selector and updates.
 *
 * @param  selector - The selector to use for updating data in the store.
 * @param  updates - The updates to be applied to the data in the store using the specified selector.
 * If updates is a function, it will receive the previous value of the data and must return the new value.
 */
export var updateSyncV = function (selector, updates) {
    if (typeof updates === "function") {
        var response = update(store, selector, updates);
        emitChange();
        return response;
    }
    else {
        var response = set(store, selector, updates);
        emitChange();
        return response;
    }
};
