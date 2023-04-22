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
export var defaultConfig = {
    initialState: { data: null, loading: false, error: false },
};
/**
 * A custom hook for managing asynchronous data in an external store with synchronous state.
 *
 * @param selector - The selector for the asynchronous data.
 * @param config - Optional configuration options.
 * @param config.initialState - Optional initial state.
 * @param config.initialState.data - Optional initial data, default to null.
 * @param config.initialState.loading - Optional initial loading status, default to false.
 * @param config.initialState.error - Optional initial error status, default to false.
 */
export var useAsyncV = function (selector, config) {
    if (config === void 0) { config = defaultConfig; }
    var defaultInitialState = defaultConfig.initialState;
    var customInitialState = __assign(__assign({}, defaultInitialState), config.initialState);
    update(store, selector, function (p) {
        if (typeof p === "object") {
            if ("data" in p && "loading" in p && "error" in p)
                return p;
            return __assign(__assign({}, customInitialState), p);
        }
        return customInitialState;
    });
    // Get the synchronous state object for the given selector
    var state = useSyncV(selector);
    // Return the synchronous state object
    return state;
};
