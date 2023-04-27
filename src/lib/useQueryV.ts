import { useEffect } from 'react';
import {
  updateAsyncV, updateAsyncVConfig, updateAsyncVDefaultConfig,
} from './updateAsyncV.js';
import {
  asyncReturn,
  defaultAsyncReturn,
  useAsyncV, useAsyncVConfig, useAsyncVDefaultConfig,
} from './useAsyncV.js';
import { defaultsDeep } from 'lodash-es';

export type useQueryVConfig = {
  updateAsyncV: Partial<updateAsyncVConfig>;
  useAsyncV: Partial<useAsyncVConfig>;
  cacheData: boolean;
}

export type useQueryVDefaultConfig = {
  updateAsyncV: updateAsyncVDefaultConfig,
  useAsyncV: useAsyncVDefaultConfig,
  cacheData: boolean
}

const useQueryDefaultConfigTemplate: useQueryVDefaultConfig = {
  useAsyncV: useAsyncVDefaultConfig,
  updateAsyncV: updateAsyncVDefaultConfig,
  cacheData: true
}

/**
 * Default config for useQueryV
 */
export const useQueryVDefaultConfig: useQueryVDefaultConfig = {
  useAsyncV: {
    ...useAsyncVDefaultConfig,
    initialState:{
      ...defaultAsyncReturn,
      loading:true
    }
  },
  updateAsyncV:updateAsyncVDefaultConfig,
  cacheData: true
}

/**
 * Hook that provides a reactive way to fetch data asynchronously and update the synchronous state of the application.
 * @param selector - The selector for the synchronous state object to update.
 * @param asyncFn - The asynchronous function to call and get data.
 * @param config - The configuration object for the hook. Optional.
 * {@link useQueryVDefaultConfig}
 */
export const useQueryV = (
  selector: string,
  asyncFn: () => Promise<unknown>,
  config: Partial<useQueryVConfig> = useQueryVDefaultConfig
): unknown | asyncReturn => {
  const customConfig = defaultsDeep(structuredClone(useQueryVDefaultConfig), useQueryVDefaultConfig) as useQueryVConfig

  const state = useAsyncV(selector, customConfig.useAsyncV);

  useEffect(() => {
    // don't fetch if fetched data existed and cacheData is set to true
    if (state && config.cacheData && typeof state === "object" && "data" in state && "loading" in state && "error" in state && state.data !== null) return
    // fetch data
    updateAsyncV(selector, () => asyncFn(), customConfig.updateAsyncV);
  }, []);

  return state
};
