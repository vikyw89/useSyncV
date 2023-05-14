# useSyncV

DOC : https://vikyw89.github.io/useSyncV/

NPM: https://www.npmjs.com/package/use-sync-v

GH: https://github.com/vikyw89/useSyncV

breaking change on v3

Why use sync v ?

- in front all we want is to get synced data from backend
  - recreating database in front end in a global state is tedious
  - just subscribe to the data that we need, that we can access anywhere in front end
- opinionated

## To start

```jsx
npm i use-sync-v
```

## Usage Example

### To subscribe data from backend for backend without built in subscription

- You want to have a global store that fetch data from backend
- everytime you modify the backend data, useAsyncSubV will refetch the data for you
- we use stale data while refetching by default
- loading and data state can both be true at the same time
- when the component is dismounted, all fetched data will be erased

```jsx
const asyncFn = async () => {
  const response = await fetch('https://randomuser.me/api/');
  const data = await response.json();
  return data;
};

export const UseAsyncSubVTest = () => {
  // this will subscribe this component to 'randomUser', whenever we do setAsyncFn with 'randomUser' as selector, the data will refetch
  const { data, loading, error } = useAsyncSubV('randomUser', asyncFn);

  const refetchHandler = async () => {
    // we want to modify backend data
    asyncRefetchV('randomUser', async (p) => {
      // we can set the data here for optimistic rendering (optional)
      setSyncV('randomUser', someDataForOptimisticRendering);

      // we can put function here to post / modify data in backend database
      await insertDataToRandomUserTable();

      // useAsyncSubV will automatically refetch data
    });
  };
  return (
    <div>
      {loading && <div>Loading</div>}
      {data && <div>{JSON.stringify(data)}</div>}
      {error && <div>error</div>}
      <button onClick={refetchHandler}>refetch</button>
    </div>
  );
};

// let's say we have another component that we want to use the data from 'randomUser'
export const AnotherComponent = () => {
  // access data from 'randomUser' earlier
  const { data, loading, error } = useAsyncV('randomUser');
  return (
    <div>
      {loading && <div>Loading</div>}
      {data && <div>{JSON.stringify(data)}</div>}
      {error && <div>error</div>}
      <button onClick={refetchHandler}>refetch</button>
    </div>
  );
};
```
### To subscribe data from backend for backend with built in subscription

```jsx
export const AsyncSubTest = () => {
  const {data, loading, error} = useAsyncV('random')

  useEffect(()=>{
    // set up subscription 
    // then modify state data with 
    setAsyncV('random', dataReturnedFromSubscription)
    // this way, everytime there's a new data sent from backend, it will automatically stored to 'random' state
  },[])
}
```
### To have a global state, like redux, zustand etc

```jsx
setSyncV('counter', 0);
// create a counter state with initial value of 0
// this is not a hook, you can call the function anywhere

setSyncV('counter', (p) => p + 1);
// this will increment counter state by 1

setSyncV('data', [
  {
    name: 'Irene'
  },
  {
    name: 'Irenelle'
  }
]);
// this will store an Array of Object into "data" state
```

Updating a deeply nested object is easy

```jsx
setSyncV('data[0].phone_number', '010039945');
// this will add phone number field to the first object in our Array under the name Irene

getSyncV('data[0]');
// => {
//   name:'Irene',
//   phone_number:'010039945'
// }
```

### To have our react component listens to state change with selector

```jsx
export const CounterDisplayComponent = () => {
  const data = useSyncV('data[0]');
  // sync this component to "data[0]" state, will re render component whenever the value of "data[0]" state changes
};
```

### To recap:

#### For sync global state

```jsx
setSyncV(selector:string, updates:function(previousValue) || value)
// to update the value of the state selector using an updater function or a value
// the updater function take a parameter (original state) and return a value (updated state)
// if given a value, it will replace existing value with the value

useSyncV(selector:string)
// to subscribe to the state selector, and will re render the component whenever the value change
// be specific in the selector to prevent unnecessary rerendering
```

#### For async global state
- with backend without built in subscription
```jsx
useAsyncSubV(selector:string, asyncFn:function, config?:obj)
// to subscribe to backend

useAsyncV(selector:string, config?:object)
// will subscribe to the selector, and if there's no existing data, it will prepopulate it with {loading, data, error} initial state

asyncRefetchV(selector:string, asyncFn:function, config?:object)
// to fetch a data from api, save the results into the store

```
- with backend with built in subscription like Firestore
```jsx
useAsyncV(selector:string)
// to listen to asyncData

setAsyncV(selector:string, asyncFn:function, config?:object)
//
```
for more explanation: look at the code snippet
