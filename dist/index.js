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
export var OPTIONS = {
    test: 'test'
};
/**
 *
 * @param param1 - default to {@link OPTIONS}
 */
export var example = function (param1) {
    if (param1 === void 0) { param1 = OPTIONS; }
};
