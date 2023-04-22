import { useEffect } from "react";
import { updateAsyncV, updateAsyncVDefaultConfig } from "./updateAsyncV.js";
import { useAsyncV, useAsyncVDefaultConfig } from "./useAsyncV.js";
/**
 * Default config for useQueryV
 */
export var useQueryVDefaultConfig = {
    useAsyncV: useAsyncVDefaultConfig,
    updateAsyncV: updateAsyncVDefaultConfig,
};
/**
 * Hook that provides a reactive way to fetch data asynchronously and update the synchronous state of the application.
 * @param selector - The selector for the synchronous state object to update.
 * @param asyncFn - The asynchronous function to call and get data.
 * @param config - The configuration object for the hook. Optional.
 */
export var useQueryV = function (selector, asyncFn, config) {
    if (config === void 0) { config = useQueryVDefaultConfig; }
    var state = useAsyncV(selector, config === null || config === void 0 ? void 0 : config.useAsyncV);
    useEffect(function () {
        // if (state.data === null) return
        updateAsyncV(selector, asyncFn, config === null || config === void 0 ? void 0 : config.updateAsyncV);
    }, []);
    return state;
};
