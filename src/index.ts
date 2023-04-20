import { result, set, unset, update } from "lodash";
import { useEffect, useSyncExternalStore } from "react";

const store: any = {};

let subscribers: any = [];

const emitChange = () => {
  for (let subscriber of subscribers) {
    subscriber();
  }
};

export const readSyncV = (selector: string) => {
  const response = result(store, selector);
  return response;
};

export const createSyncV = (selector: string, value: any) => {
  const response = set(store, selector, value);
  emitChange();
  return response;
};

export const updateSyncV = (
  selector: string,
  updaterFn: (value: any) => any
) => {
  const response = update(store, selector, updaterFn);
  emitChange();
  return response;
};

export const deleteSyncV = (selector: string) => {
  const response = unset(store, selector);
  emitChange();
  return response;
};

const subscribe = (callback: CallableFunction) => {
  subscribers = [...subscribers, callback];
  return () => {
    subscribers = subscribers.filter((p: any) => {
      return p !== callback;
    });
  };
};

export const useSyncV = (selector: string) => {
  const getSnapshot = () => {
    return JSON.stringify(result(store, selector));
  };

  const getServerSnapshot = () => {
    return JSON.stringify(result(store, selector));
  };

  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return readSyncV(selector);
};

export const debugSyncV = (selector: string) => {
  console.group(`Debug SyncV`);
  console.log(`Selector: ${selector}`);
  console.log(`Value:`, result(store, selector));
  console.groupEnd();
};

export const createAsyncV = async (
  selector: string,
  asyncFn: CallableFunction
) => {
  set(store, selector, {
    data: null,
    loading: true,
    error: false,
  });
  try {
    const data = await asyncFn();
    createSyncV(selector, {
      data: data,
      loading: false,
      error: false,
    });
  } catch (error) {
    createSyncV(selector, {
      data: null,
      loading: false,
      error: error,
    });
  }
};

export const updateAsyncV = async (
  selector: string,
  asyncFn: CallableFunction
) => {
  update(store, selector, (p) => ({
    ...p,
    loading: true,
    error: false,
  }));
  try {
    const data = await asyncFn();
    updateSyncV(selector, (p: any) => ({
      ...p,
      data: data,
      loading: false,
      error: false,
    }));
  } catch (error) {
    updateSyncV(selector, (p: any) => ({
      ...p,
      loading: false,
      error: error,
    }));
  }
};

export const useAsyncV = (selector: string) => {
  update(store, selector, (p: any) => {
    if (p) return p;
    return {
      data: null,
      loading: true,
      error: false,
    };
  });
  const state = useSyncV(selector);
  return state;
};

export const useQueryV = (selector: string, asyncFn: CallableFunction) => {
  const state = useAsyncV(selector);
  useEffect(() => {
    createAsyncV(selector, asyncFn);
  }, []);
  return state;
};
