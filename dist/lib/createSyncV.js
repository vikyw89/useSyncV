var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { update } from "lodash-es";
import { emitChange, store } from "./helper";
/**
 * A function that creates new data in the store synchronously using the specified selector and value.
 *
 * @param {string} selector - The selector to use for creating new data in the store.
 * @param {*} value - The value to be added to the store using the specified selector.
 *
 * @returns {*} - The data that was created in the store using the specified selector and value.
 */
export var createSyncV = function (selector, value) {
    var response = update(store, selector, function (p) {
        if (Array.isArray(p)) {
            return __spreadArray(__spreadArray([], p, true), [value], false);
        }
        return [value];
    });
    emitChange();
    return response;
};
