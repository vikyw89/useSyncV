# useSyncV

a simplistic CRUD global state management for react with a built in async fetching

- no boilercode to start with, use it out of the box
- CREATE, READ, UPDATE and DELETE
- structure the store / state how you want it, it's behaving like JS object
- efficient rendering by utilizing selector
- extendable if you like to use reducer, write a reducer just like how you write vanilla JS IIFE or static class
- built in fetch with cache, and return synced {data, loading, error} for your UI

## To start

```jsx
npm i use-sync-v
```

## Usage

### To store and update data

```jsx
updateSyncV("counter", 0);
// create a counter state with initial value of 0
// this is not a hook, you can call the function anywhere

updateSyncV("counter", (p) => p + 1);
// this will increment counter state by 1

updateSyncV("data", [
  {
    name: "Irene",
  },
  {
    name: "Irenelle",
  },
]);
// this will store an Array of Object into "data" state
```

Updating a deeply nested object is easy

```jsx
updateSyncV("data[0].phone_number", "010039945");
// this will add phone number field to the first object in our Array under the name Irene

readSyncV("data[0]");
// => {
//   name:'Irene',
//   phone_number:'010039945'
// }
```

### To have our react component listens to state change with selector

```jsx
export const CounterDisplayComponent = () => {
  const data = useSyncV("data[0]");
  // sync this component to "data[0]" state, will re render component whenever the value of "data[0]" state changes
};
```

### Fetching data:

Let's say we want to fetch data from api and store it in "api" state

```jsx
const fetchRandomUser = async () => {
  const response = await fetch("https://randomuser.me/api/");
  const data = await response.json();
  return data;
};

export const DataDisplayComponent = () => {
  const { data, loading, error } = useAsyncV("api");

  useEffect(() => {
    updateAsyncV("api", fetchRandomUser);
  }, []);

  return (
    <div>
      {data && <div>{data}</div>}
      {loading && <div>Loading...</div>}
      {error && <div>Error fetching data...</div>}
    </div>
  );
};
```

For async data, where we want to track loading, and error state, we use updateAsyncV and useAsyncV
We can simplify it further by using useQueryV, it's a wrapper for useAsyncV and updateAsyncV

```jsx
export const DataDisplayComponent = () => {
  const { data, loading, error } = useQueryV("api", fetchRandomUser);

  return (
    <div>
      {data && <div>{data}</div>}
      {loading && <div>Loading...</div>}
      {error && <div>Error fetching data...</div>}
    </div>
  );
};
```

### To organize the store in a different file and have a reducer

in your stores directory

```jsx
// @/lib/store.index.js

import { updateSyncV } from "use-sync-v";

updateSyncV("counter", 0);

// for the reducer
export class CounterReducer {
  static increment = () => {
    updateSyncV("counter", (p) => p + 1);
  };
  static reset = () => {
    updateSyncV("counter", 0);
  };
}

export const initStores = () => {};
```

and call the file in the root of your react app

```jsx
// _App.js

import { initStores } from "@/lib/store";

initStores();
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

and call the reducer anywhere

```jsx
export const CounterComponent = () => {
  const counter = useSyncV("counter");
  return (
    <>
      <div>{counter}</div>
      <button onClick={() => CounterReducer.increment()}>increment</button>
      <button onClick={() => CounterReducer.reset()}>reset</button>
    </>
  );
};
```

### To recap:

```jsx
readSyncV(selector:string)
// to read value of the state selector at the time the function is called

updateSyncV(selector:string, updates:function || value)
// to update the value of the state selector using an updater function or a value
// the updater function take a parameter (original state) and return a value (updated state)
// if given a value, it will replace existing value with the value

useSyncV(selector:string)
// to subscribe to the state selector, and will re render the component whenever the value change
// be specific in the selector to prevent unnecessary rerendering

useAsyncV(selector:string, asyncFn:function, ?config:obj)
// will subscribe to the selector, and if there's no existing data, it will prepopulate it with {loading, data, error} initial state

updateAsyncV(selector:string, asyncFn:function, ?config:obj)
// to fetch a data from api, save the results into the store

useQueryV(selector:string, asyncFn:function, ?config:obj)
// this is a bundle of useAsyncV and updateAsyncV
// to fetch a data from api, save the results into the store, and subscribe to it
// by default the result is cached
```
