var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { update } from "lodash-es";
import { useSyncV } from "./useSyncV.js";
import { store } from "./helper.js";
/**
 * A custom hook for managing asynchronous data in an external store with synchronous state.
 *
 * @param {string} selector - The selector for the asynchronous data.
 * @param {Object} config - Optional configuration options.
 * @param {Object} config.initialState - The initial state object for the asynchronous data. Default: { data: null, loading: false, error: false }.
 * @returns {Object} The synchronous state object for the given selector.
 */
export var useAsyncV = function (selector, config) {
    if (config === void 0) { config = { initialState: { data: null, loading: false, error: false } }; }
    // Get initial state from config
    var initialState = config.initialState;
    update(store, selector, function (p) {
        if (typeof p === "object") {
            if ("data" in p && "loading" in p && "error" in p)
                return p;
            return __assign(__assign({}, p), initialState);
        }
        return initialState;
    });
    // Get the synchronous state object for the given selector
    var state = useSyncV(selector);
    // Return the synchronous state object
    return state;
};
