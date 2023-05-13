import { defaultsDeep } from "lodash-es";
import { useEffect } from "react";
import { setAsyncV, setAsyncVDefaultConfig } from "./setAsyncV.js";
import { setSyncV } from "./setSyncV.js";
import { useAsyncStatusV } from "./useAsyncStatusV.js";
import { useSyncV } from "./useSyncV.js";
/**
 * Default config for useQueryV
 */
export const useSubAsyncVDefaultConfig = Object.assign({}, setAsyncVDefaultConfig);
/**
 * Hook that provides a reactive way to fetch data asynchronously and update the synchronous state of the application.
 * Will refetch whenever data changes
 * @param selector - The selector for the synchronous state object to update.
 * @param asyncFn - The asynchronous function to call and get data.
 * @param config - The configuration object for the hook. Optional.
 * {@link useSubAsyncVDefaultConfig}
 */
export const useSubAsyncV = (selector, asyncFn, config = useSubAsyncVDefaultConfig) => {
    const customConfig = defaultsDeep(config, useSubAsyncVDefaultConfig);
    const asyncStatus = useAsyncStatusV(selector);
    const data = useSyncV(selector);
    let dataSnapshot;
    try {
        dataSnapshot = JSON.stringify(data);
    }
    catch (_a) {
        dataSnapshot = data;
    }
    // initial fetch
    useEffect(() => {
        setAsyncV(selector, asyncFn, customConfig);
        return () => {
            // clear data in syncStore when component dismounted
            setSyncV(selector);
        };
    }, []);
    // for refetch
    // will refetch when data inside the selector is modified
    useEffect(() => {
        if (asyncStatus.loading)
            return;
        setAsyncV(selector, asyncFn, customConfig);
    }, [dataSnapshot, asyncStatus.loading]);
    return Object.assign(Object.assign({}, asyncStatus), { data: data });
};
//# sourceMappingURL=useSubAsyncV.js.map