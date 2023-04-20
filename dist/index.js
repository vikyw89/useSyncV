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
const readSyncV = (selector) => {
    const response = (0, lodash_1.result)(store, selector);
    return response;
};
exports.readSyncV = readSyncV;
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
const debugSyncV = (selector) => {
    console.group(`Debug SyncV`);
    console.log(`Selector: ${selector}`);
    console.log(`Value:`, JSON.parse(JSON.stringify((0, lodash_1.result)(store, selector))));
    console.groupEnd();
};
exports.debugSyncV = debugSyncV;
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
const useAsyncV = (selector, config = { initialState: { data: null, loading: false, error: false } }) => {
    // Get initial state from config
    const initialState = config.initialState;
    /**
     * Update the store with the initial state if no data exists.
     * @param {Object} p - The previous state object.
     * @return {Object} The updated state object.
     */
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