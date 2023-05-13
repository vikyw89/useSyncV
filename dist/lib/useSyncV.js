import { useSyncExternalStore } from 'react';
import { subscribe } from './helper.js';
import { getSyncV } from './getSyncV.js';
/**
 * A hook that provides synchronous access to the data in the store using the specified selector.
 *
 * @param selector - The selector to use for accessing data in the store.
 */
export const useSyncV = (selector) => {
    const getSnapshot = () => {
        const data = getSyncV(selector);
        try {
            const snapshot = JSON.stringify(data);
            return snapshot;
        }
        catch (_a) {
            return data;
        }
    };
    const getServerSnapshot = () => {
        const data = getSyncV(selector);
        try {
            const snapshot = JSON.stringify(data);
            return snapshot;
        }
        catch (_a) {
            return data;
        }
    };
    useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    return getSyncV(selector);
};
//# sourceMappingURL=useSyncV.js.map