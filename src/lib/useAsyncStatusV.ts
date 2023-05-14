import { useSyncExternalStore } from 'react';
import { getAsyncStatusV } from './getAsyncStatusV.js';
import { subscribe } from './helper.js';

/**
 * A hook that provides synchronous access to the data in the store using the specified selector.
 *
 * @param selector - The selector to use for accessing data in the store.
 */
export const useAsyncStatusV = (selector: string) => {
    const getSnapshot = () => {
        return JSON.stringify(getAsyncStatusV(selector))
    };

    const getServerSnapshot = () => {
        return JSON.stringify(getAsyncStatusV(selector))
    };


    useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    return getAsyncStatusV(selector)
};
