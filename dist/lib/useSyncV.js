import { useSyncExternalStore } from 'react';
import { subscribe } from './helper.js';
import { getSyncV } from './getSyncV.js';
/**
 * A hook that provides synchronous access to the data in the store using the specified selector.
 *
 * @param selector - The selector to use for accessing data in the store.
 */
export const useSyncV = (selector) => {
    const data = getSyncV(selector);
    const getSnapshot = () => {
        return JSON.stringify(data);
    };
    const getServerSnapshot = () => {
        return JSON.stringify(data);
    };
    useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    return data;
};
//# sourceMappingURL=useSyncV.js.map