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
exports.useQueryV = exports.useAsyncV = exports.updateAsyncV = exports.createAsyncV = exports.debugSyncV = exports.useSyncV = exports.deleteSyncV = exports.updateSyncV = exports.createSyncV = exports.readSyncV = void 0;
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
    const response = (0, lodash_1.set)(store, selector, value);
    emitChange();
    return response;
};
exports.createSyncV = createSyncV;
const updateSyncV = (selector, updaterFn) => {
    const response = (0, lodash_1.update)(store, selector, updaterFn);
    emitChange();
    return response;
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
    console.log(`Value:`, (0, lodash_1.result)(store, selector));
    console.groupEnd();
};
exports.debugSyncV = debugSyncV;
const createAsyncV = (selector, asyncFn) => __awaiter(void 0, void 0, void 0, function* () {
    (0, lodash_1.set)(store, selector, {
        data: null,
        loading: true,
        error: false,
    });
    try {
        const data = yield asyncFn();
        (0, exports.createSyncV)(selector, {
            data: data,
            loading: false,
            error: false,
        });
    }
    catch (error) {
        (0, exports.createSyncV)(selector, {
            data: null,
            loading: false,
            error: error,
        });
    }
});
exports.createAsyncV = createAsyncV;
const updateAsyncV = (selector, asyncFn) => __awaiter(void 0, void 0, void 0, function* () {
    (0, lodash_1.update)(store, selector, (p) => (Object.assign(Object.assign({}, p), { loading: true, error: false })));
    try {
        const data = yield asyncFn();
        (0, exports.updateSyncV)(selector, (p) => (Object.assign(Object.assign({}, p), { data: data, loading: false, error: false })));
    }
    catch (error) {
        (0, exports.updateSyncV)(selector, (p) => (Object.assign(Object.assign({}, p), { loading: false, error: error })));
    }
});
exports.updateAsyncV = updateAsyncV;
const useAsyncV = (selector) => {
    (0, lodash_1.update)(store, selector, (p) => {
        if (p)
            return p;
        return {
            data: null,
            loading: true,
            error: false,
        };
    });
    const state = (0, exports.useSyncV)(selector);
    return state;
};
exports.useAsyncV = useAsyncV;
const useQueryV = (selector, asyncFn) => {
    const state = (0, exports.useAsyncV)(selector);
    (0, react_1.useEffect)(() => {
        (0, exports.createAsyncV)(selector, asyncFn);
    }, []);
    return state;
};
exports.useQueryV = useQueryV;
