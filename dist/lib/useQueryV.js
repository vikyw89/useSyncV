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
import { useEffect } from "react";
import { updateAsyncV, updateAsyncVDefaultConfig } from "./updateAsyncV.js";
import { useAsyncV, useAsyncVDefaultConfig } from "./useAsyncV.js";
/**
 * Default config for useQueryV
 */
export var useQueryVDefaultConfig = {
    useAsyncV: __assign(__assign({}, useAsyncVDefaultConfig), { initialState: __assign(__assign({}, useAsyncVDefaultConfig.initialState), { loading: true }) }),
    updateAsyncV: updateAsyncVDefaultConfig,
};
/**
 * Hook that provides a reactive way to fetch data asynchronously and update the synchronous state of the application.
 * @param selector - The selector for the synchronous state object to update.
 * @param asyncFn - The asynchronous function to call and get data.
 * @param config - The configuration object for the hook. Optional.
 * {@link useQueryVDefaultConfig}
 */
export var useQueryV = function (selector, asyncFn, config) {
    if (config === void 0) { config = useQueryVDefaultConfig; }
    var state = useAsyncV(selector, config === null || config === void 0 ? void 0 : config.useAsyncV);
    useEffect(function () {
        updateAsyncV(selector, asyncFn, config === null || config === void 0 ? void 0 : config.updateAsyncV);
    }, []);
    return state;
};
//# sourceMappingURL=useQueryV.js.map