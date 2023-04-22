var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { result } from "lodash-es";
export var store = {};
export var subscribers = [];
export var emitChange = function () {
    for (var _i = 0, subscribers_1 = subscribers; _i < subscribers_1.length; _i++) {
        var subscriber = subscribers_1[_i];
        subscriber();
    }
};
export var subscribe = function (callback) {
    subscribers = __spreadArray(__spreadArray([], subscribers, true), [callback], false);
    return function () {
        subscribers = subscribers.filter(function (p) {
            return p !== callback;
        });
    };
};
/**
 * A function that logs debug information about the data in the store using the specified selector.
 *
 * @param selector - The selector to use for accessing data in the store.
 */
export var debugSyncV = function (selector) {
    console.group("Debug SyncV");
    console.log("Selector: ".concat(selector));
    console.log("Value:", JSON.parse(JSON.stringify(result(store, selector))));
    console.groupEnd();
};
