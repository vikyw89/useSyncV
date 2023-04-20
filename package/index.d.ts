export function readSyncV(selector: string): any;
export function createSyncV(selector: string, value: any): any;
export function updateSyncV(selector: string, updaterFn: Function): any;
export function deleteSyncV(selector: string): any;
export function useSyncV(selector: string): any;
export function debugSyncV(selector: string): void;
export function createAsyncV(selector: string, asyncFn: Function): Promise<void>;
export function updateAsyncV(selector: string, asyncFn: Function): Promise<void>;
export function useAsyncV(selector: string): any;
export function useQueryV(selector: string, asyncFn: Function): any;
