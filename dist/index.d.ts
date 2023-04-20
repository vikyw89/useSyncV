export declare const readSyncV: (selector: string) => unknown;
export declare const createSyncV: (selector: string, value: any) => any;
export declare const updateSyncV: (selector: string, updaterFn: (value: any) => any) => any;
export declare const deleteSyncV: (selector: string) => boolean;
export declare const useSyncV: (selector: string) => unknown;
export declare const debugSyncV: (selector: string) => void;
export declare const createAsyncV: (selector: string, asyncFn: CallableFunction) => Promise<void>;
export declare const updateAsyncV: (selector: string, asyncFn: CallableFunction) => Promise<void>;
export declare const useAsyncV: (selector: string) => unknown;
export declare const useQueryV: (selector: string, asyncFn: CallableFunction) => unknown;
//# sourceMappingURL=index.d.ts.map