import { diffJson } from 'diff';
import { result, update } from 'lodash-es';
export const store = {};

// eslint-disable-next-line @typescript-eslint/ban-types
export let subscribers: Array<Function> = [];

export const selectorHistory = {};

export const emitChange = () => {
  for (const subscriber of subscribers) {
    subscriber();
  }
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const subscribe = (callback: Function) => {
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

  console.group(`START OF DEBUGSYNCV`);
  console.count('Iteration number');
  console.log(`Selector:`, selectorKey);
  console.groupCollapsed(`Value`);
  console.log(currentSelectorJSONValue);
  console.groupEnd();

  let previousSelectorJSONValue = JSON.stringify('');

  update(selectorHistory, selectorKey, (p) => {
    if (!p) {
      p = [JSON.stringify('')];
    }
    const historyLength = p.length;
    // get the previous selector history value
    previousSelectorJSONValue = p[historyLength - 1] ?? JSON.stringify('');
    if (historyLength >= 10) {
      p.shift();
    }
    return [...p, currentSelectorJSONValue];
  });

  // diff selector history with previous result
  console.groupCollapsed('Change log');
  const listOfChangedObject = diffJson(
    JSON.parse(previousSelectorJSONValue),
    JSON.parse(currentSelectorJSONValue),
    { newlineIsToken: false }
  );
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
