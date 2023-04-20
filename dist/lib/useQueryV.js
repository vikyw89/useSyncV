import { useEffect } from "react";
import { useAsyncV } from "./useAsyncV";
import { updateAsyncV } from "./updateAsyncV";
/**
 * Hook that provides a reactive way to fetch data asynchronously and update the synchronous state of the application.
 * @param {string} selector - The selector for the synchronous state object to update.
 * @param {CallableFunction} asyncFn - The asynchronous function to call and get data.
 * @param {Object} config - The configuration object for the hook. Optional.
 * @param {Object} config.useAsyncV - The configuration object for the `useAsyncV` hook. Optional.
 * @param {Object} config.useAsyncV.initialState - The initial state object for the `useAsyncV` hook. Optional.
 * @param {Object} config.updateAsyncV - The configuration object for the `updateAsyncV` function. Optional.
 * @param {boolean} config.updateAsyncV.deleteExistingData - Whether to delete existing data in the synchronous state object before updating with the new data. Optional.
 * @returns {Object} The synchronous state object for the given selector, updated with the new data fetched asynchronously.
 */
export var useQueryV = function (selector, asyncFn, config) {
    if (config === void 0) { config = {
        useAsyncV: { initialState: { data: null, loading: true, error: false } },
        updateAsyncV: { deleteExistingData: false },
    }; }
    var state = useAsyncV(selector, config.useAsyncV);
    useEffect(function () {
        // if (state.data === null) return
        updateAsyncV(selector, asyncFn, config.updateAsyncV);
    }, []);
    return state;
};
