export { debugSyncV } from "./lib/helper.js";
export { createSyncV } from "./lib/createSyncV.js";
export { readSyncV } from "./lib/readSyncV.js";
export { updateSyncV } from "./lib/updateSyncV.js";
export { deleteSyncV } from "./lib/deleteSyncV.js";
export { useSyncV } from "./lib/useSyncV.js";
export { updateAsyncV } from "./lib/updateAsyncV.js";
export { useAsyncV } from "./lib/useAsyncV.js";
export { useQueryV } from "./lib/useQueryV.js";
/**
 *
 */
export declare const OPTIONS: {
    test: string;
};
/**
 *
 * @param param1 - default to {@link OPTIONS}
 */
export declare const example: (param1?: {
    test: string;
}) => void;
