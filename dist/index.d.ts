export declare const readSyncV: (selector: string) => unknown;
export declare const createSyncV: (selector: string, value: any) => any;
export declare const updateSyncV: (selector: string, updates: any) => any;
export declare const deleteSyncV: (selector: string) => boolean;
export declare const useSyncV: (selector: string) => unknown;
export declare const debugSyncV: (selector: string) => void;
export declare const updateAsyncV: (selector: string, asyncFn: CallableFunction, config?: {
    deleteExistingData: boolean;
}) => Promise<void>;
export declare const useAsyncV: (selector: string, config?: {
    initialState: {
        data: null;
        loading: boolean;
        error: boolean;
    };
}) => unknown;
export declare const useQueryV: (selector: string, asyncFn: CallableFunction, config?: {
    useAsyncV: {
        initialState: {
            data: null;
            loading: boolean;
            error: boolean;
        };
    };
    updateAsyncV: {
        deleteExistingData: boolean;
    };
}) => unknown;
