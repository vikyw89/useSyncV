/* eslint-disable @typescript-eslint/no-explicit-any */
import { result } from 'lodash-es';
import { useSyncExternalStore } from 'react';
import { store, subscribe } from './helper.js';
import { readSyncV } from './readSyncV.js';
/**
 * A hook that provides synchronous access to the data in the store using the specified selector.
 *
 * @param selector - The selector to use for accessing data in the store.
 */
export var useSyncV = function (selector) {
    var getSnapshot = function () {
        return JSON.stringify(result(store, selector));
    };
    var getServerSnapshot = function () {
        return JSON.stringify(result(store, selector));
    };
    useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    return readSyncV(selector);
};
