import { diffJson } from 'diff';
import { result, update } from 'lodash-es';

export const store = {};

export let subscribers: Array<() => unknown> = [];

export const selectorHistory = {};

export const emitChange = () => {
  for (const subscriber of subscribers) {
    subscriber();
  }
};

export const subscribe = (callback: () => unknown) => {
  subscribers = [...subscribers, callback];
  return () => {
    subscribers = subscribers.filter((p) => {
      return p !== callback;
    });
  };
};

export const debugSyncVConfig = {
  maxHistory: 50
};

/**
 * A function that logs debug information about the data in the store using the specified selector.
 *
 * @param selector - The selector to use for accessing data in the store, debug store root if empty
 */
export const debugSyncV = (selector: string | undefined) => {
  const selectorKey: string = selector ?? 'ROOT';
  const currentSelectorJSONValue: string = selector
    ? JSON.stringify(result(store, selector, ''), null, '\t')
    : JSON.stringify(store, null, '\t');

  console.groupCollapsed(`START OF DEBUGSYNCV OF ${selectorKey}`);
  console.count('Iteration number');
  console.groupCollapsed(`Value`);
  console.log(currentSelectorJSONValue);
  console.groupEnd();

  let previousSelectorJSONValue = JSON.stringify('');

  update(selectorHistory, selectorKey, (p) => {
    if (!p) {
      p = [JSON.stringify('')];
    }
    if (Array.isArray(p)) {
      const historyLength = p.length;
      previousSelectorJSONValue = p[historyLength - 1] ?? JSON.stringify('');
      if (historyLength >= 10) {
        p.shift();
      }
      return [...p, currentSelectorJSONValue];
    }
    throw "debugSyncV update history bug"
  })

  // diff selector history with previous result
  console.groupCollapsed('Change log');
  const listOfChangedObject = diffJson(
    JSON.parse(previousSelectorJSONValue),
    JSON.parse(currentSelectorJSONValue),
    { newlineIsToken: false }
  );
  console.log(listOfChangedObject)
  listOfChangedObject.forEach((v) => {
    if (v.added) {
      console.log(`--`, v.value);
    } else if (v.removed) {
      console.info(`++`, v.value);
    }
  });
  console.groupEnd();
  console.groupEnd();
  console.log(JSON.parse(currentSelectorJSONValue));
};

export type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>;
} : T;