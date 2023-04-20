"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useQueryV = exports.useAsyncV = exports.updateAsyncV = exports.debugSyncV = exports.useSyncV = exports.deleteSyncV = exports.updateSyncV = exports.createSyncV = exports.readSyncV = void 0;
const lodash_1 = require("lodash");
const react_1 = require("react");
const store = {};
let subscribers = [];
const emitChange = () => {
    for (let subscriber of subscribers) {
        subscriber();
    }
};
/**
 * A function that reads data from the store synchronously using the specified selector.
 *
 * @param {string} selector - The selector to use for reading data from the store.
 *
 * @returns {*} - The data read from the store using the specified selector.
 */
const readSyncV = (selector) => {
    const response = (0, lodash_1.result)(store, selector);
    return response;
};
exports.readSyncV = readSyncV;
/**
 * A function that creates new data in the store synchronously using the specified selector and value.
 *
 * @param {string} selector - The selector to use for creating new data in the store.
 * @param {*} value - The value to be added to the store using the specified selector.
 *
 * @returns {*} - The data that was created in the store using the specified selector and value.
 */
const createSyncV = (selector, value) => {
    const response = (0, lodash_1.update)(store, selector, (p) => {
        if (Array.isArray(p)) {
            return [...p, value];
        }
        return [value];
    });
    emitChange();
    return response;
};
exports.createSyncV = createSyncV;
/**
 * A function that updates data in the store synchronously using the specified selector and updates.
 *
 * @param {string} selector - The selector to use for updating data in the store.
 * @param {*} updates - The updates to be applied to the data in the store using the specified selector.
 * If updates is a function, it will receive the previous value of the data and must return the new value.
 *
 * @returns {*} - The updated data in the store using the specified selector and updates.
 */
const updateSyncV = (selector, updates) => {
    if (typeof updates === "function") {
        const response = (0, lodash_1.update)(store, selector, updates);
        emitChange();
        return response;
    }
    else {
        const response = (0, lodash_1.set)(store, selector, updates);
        emitChange();
        return response;
    }
};
exports.updateSyncV = updateSyncV;
/**
 * A function that deletes data from the store synchronously using the specified selector.
 *
 * @param {string} selector - The selector to use for deleting data from the store.
 *
 * @returns {*} - The data that was deleted from the store using the specified selector.
 */
const deleteSyncV = (selector) => {
    const response = (0, lodash_1.unset)(store, selector);
    emitChange();
    return response;
};
exports.deleteSyncV = deleteSyncV;
const subscribe = (callback) => {
    subscribers = [...subscribers, callback];
    return () => {
        subscribers = subscribers.filter((p) => {
            return p !== callback;
        });
    };
};
/**
 * A hook that provides synchronous access to the data in the store using the specified selector.
 *
 * @param {string} selector - The selector to use for accessing data in the store.
 *
 * @returns {*} - The data from the store using the specified selector.
 */
const useSyncV = (selector) => {
    const getSnapshot = () => {
        return JSON.stringify((0, lodash_1.result)(store, selector));
    };
    const getServerSnapshot = () => {
        return JSON.stringify((0, lodash_1.result)(store, selector));
    };
    (0, react_1.useSyncExternalStore)(subscribe, getSnapshot, getServerSnapshot);
    return (0, exports.readSyncV)(selector);
};
exports.useSyncV = useSyncV;
/**
 * A function that logs debug information about the data in the store using the specified selector.
 *
 * @param {string} selector - The selector to use for accessing data in the store.
 */
const debugSyncV = (selector) => {
    console.group(`Debug SyncV`);
    console.log(`Selector: ${selector}`);
    console.log(`Value:`, JSON.parse(JSON.stringify((0, lodash_1.result)(store, selector))));
    console.groupEnd();
};
exports.debugSyncV = debugSyncV;
/**
 * A function that updates the data in the store asynchronously using the specified selector and async function.
 *
 * @async
 * @param {string} selector - The selector to use for accessing data in the store.
 * @param {CallableFunction} asyncFn - The async function to call to update the data in the store.
 * @param {{deleteExistingData: boolean}} [config={deleteExistingData: false}] - An optional object that specifies whether to delete existing data before updating.
 */
const updateAsyncV = (selector, asyncFn, config = { deleteExistingData: false }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Delete existing data if specified in config
        if (config.deleteExistingData) {
            (0, exports.updateSyncV)(selector, {
                data: null,
                loading: true,
                error: false,
            });
        }
        else {
            // Keep existing data while updating
            (0, exports.updateSyncV)(selector, (p) => (Object.assign(Object.assign({}, p), { loading: true, error: false })));
        }
        // Call async function and get data
        const data = yield asyncFn();
        // Update synchronous state with new data
        (0, exports.updateSyncV)(selector, (p) => (Object.assign(Object.assign({}, p), { data: data, loading: false })));
    }
    catch (error) {
        // Handle errors
        (0, exports.updateSyncV)(selector, (p) => (Object.assign(Object.assign({}, p), { loading: false, error: error })));
    }
});
exports.updateAsyncV = updateAsyncV;
/**
 * A custom hook for managing asynchronous data in an external store with synchronous state.
 *
 * @param {string} selector - The selector for the asynchronous data.
 * @param {Object} config - Optional configuration options.
 * @param {Object} config.initialState - The initial state object for the asynchronous data. Default: { data: null, loading: false, error: false }.
 * @returns {Object} The synchronous state object for the given selector.
 */
const useAsyncV = (selector, config = { initialState: { data: null, loading: false, error: false } }) => {
    // Get initial state from config
    const initialState = config.initialState;
    (0, lodash_1.update)(store, selector, (p) => {
        if ((p === null || p === void 0 ? void 0 : p.data) !== undefined)
            return p;
        return Object.assign({}, initialState);
    });
    // Get the synchronous state object for the given selector
    const state = (0, exports.useSyncV)(selector);
    // Return the synchronous state object
    return state;
};
exports.useAsyncV = useAsyncV;
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
const useQueryV = (selector, asyncFn, config = {
    useAsyncV: { initialState: { data: null, loading: true, error: false } },
    updateAsyncV: { deleteExistingData: false },
}) => {
    const state = (0, exports.useAsyncV)(selector, config.useAsyncV);
    (0, react_1.useEffect)(() => {
        // if (state.data === null) return
        (0, exports.updateAsyncV)(selector, asyncFn, config.updateAsyncV);
    }, []);
    return state;
};
exports.useQueryV = useQueryV;
//# sourceMappingURL=index.js.map