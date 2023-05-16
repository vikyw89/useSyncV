import { defaultsDeep } from "lodash-es";
import { useEffect } from "react";
import { setAsyncV, setAsyncVDefaultConfig } from "./setAsyncV.js";
import { setSyncV } from "./setSyncV.js";
import { useAsyncV } from "./useAsyncV.js";
import { useSyncV } from "./useSyncV.js";
import { setAsyncStatusV } from "./setAsyncStatusV.js";
import { useSubStatusV } from "./useSubStatusV.js";
import { setSubStatusV } from "./setSubStatusV.js";
/**
 * Default config for useQueryV
 */
export const useAsyncSubVDefaultConfig = Object.assign({}, setAsyncVDefaultConfig);
/**
 * Hook that provides a reactive way to fetch data asynchronously and update the synchronous state of the application.
 * Will refetch whenever data changes
 * @param selector - The selector for the synchronous state object to update.
 * @param asyncFn - The asynchronous function to call and get data.
 * @param config - The configuration object for the hook. Optional.
 * {@link useAsyncSubVDefaultConfig}
 */
export const useAsyncSubV = (selector, asyncFn, config = useAsyncSubVDefaultConfig) => {
    const customConfig = defaultsDeep(config, useAsyncSubVDefaultConfig);
    const asyncStatus = useAsyncV(selector);
    const data = useSyncV(selector);
    const sub = useSubStatusV(selector);
    const refetch = sub.refetch;
    // initial fetch
    useEffect(() => {
        setAsyncV(selector, asyncFn, customConfig);
        return () => {
            // clear data in syncStore when component dismounted
            setSyncV(selector);
            setAsyncStatusV(selector);
        };
    }, []);
    // for refetch
    // will refetch when refetchSubV is called
    useEffect(() => {
        if (!refetch)
            return;
        setAsyncV(selector, asyncFn, customConfig);
        setSubStatusV(selector, { refetch: false });
    }, [refetch]);
    return Object.assign(Object.assign({}, asyncStatus), { data: data });
};
//# sourceMappingURL=useAsyncSubV.js.map