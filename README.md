# useSyncV

A lightweight React global store with TypeScript support that combines the simplicity of Zustand with the async power of SWR and React Query.

[!["npm"](https://img.shields.io/npm/v/use-sync-v)](https://www.npmjs.com/package/use-sync-v)
[!["license"](https://img.shields.io/badge/license-ISC-blue.svg)](https://github.com/vikyw89/useSyncV/blob/master/LICENSE)

## Why useSyncV?

- **Simple API** -- No boilerplate, no context providers, no reducers
- **Typed with TypeScript** -- Full type definitions out of the box
- **Flexible selectors** -- Use dot notation to access nested state (e.g., `data[0].name`)
- **Async built-in** -- First-class support for data fetching with loading/error states
- **Subscription-based refetching** -- Automatically refetch when data changes
- **Stale-while-revalidate** -- Keep showing old data while refetching new data
- **React 18 ready** -- Built on `useSyncExternalStore`

## Installation

```bash
npm install use-sync-v
```

```bash
yarn add use-sync-v
```

## Quick Start

### Global Synchronous State

Create and manage global state without any provider setup:

```jsx
import { setSyncV, useSyncV } from 'use-sync-v';

// Initialize state
setSyncV('counter', 0);

// Read and subscribe to state
function CounterDisplay() {
  const count = useSyncV('counter');
  return <div>Count: {count}</div>;
}

// Update state -- supports immutable updates via function
function IncrementButton() {
  return (
    <button onClick={() => setSyncV('counter', p => p + 1)}>
      Increment
    </button>
  );
}
```

### Deeply Nested Updates

Access and update nested objects with dot notation:

```jsx
// Set nested data
setSyncV('users', [
  { name: 'Alice', email: 'alice@example.com' },
  { name: 'Bob', email: 'bob@example.com' }
]);

// Update deeply nested property
setSyncV('users[0].phone', '010039945');

// Read specific nested value
const user = useSyncV('users[0]'); // { name: 'Alice', email: 'alice@example.com', phone: '010039945' }
```

### Async Data Fetching

Built-in support for async data with loading/error states:

```jsx
import { setAsyncV, useAsyncV } from 'use-sync-v';

function UserProfile() {
  const { data, loading, error } = useAsyncV('userProfile');

  useEffect(() => {
    setAsyncV('userProfile', async () => {
      const res = await fetch('/api/user');
      return res.json();
    });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading user</div>;
  return <div>{data?.name}</div>;
}
```

### Auto-Refetching Subscriptions

Subscribe to data that automatically refetches when you modify it:

```jsx
import { useAsyncSubV, asyncRefetchV } from 'use-sync-v';

const fetchUser = async () => {
  const res = await fetch('https://api.example.com/user');
  return res.json();
};

function UserData() {
  // This subscribes to 'userData' and will auto-refetch when data changes
  const { data, loading, error } = useAsyncSubV('userData', fetchUser);

  const handleUpdate = async () => {
    // Modify backend data, then trigger auto-refetch
    await asyncRefetchV('userData', async () => {
      await fetch('https://api.example.com/user', { method: 'PUT', body: '...' });
      // useAsyncSubV will automatically refetch after this completes
    });
  };

  return (
    <div>
      {loading && <div>Loading...</div>}
      {data && <div>{JSON.stringify(data)}</div>}
      <button onClick={handleUpdate}>Update & Refetch</button>
    </div>
  );
}

// Another component can access the same data
function UserBadge() {
  const { data } = useAsyncV('userData'); // Access cached data
  return data ? <span>{data.name}</span> : null;
}
```

### With Real-time Backends (Firebase, Firestore, etc.)

For backends with built-in subscriptions:

```jsx
import { setAsyncV, useAsyncV } from 'use-sync-v';

function LiveCounter() {
  const { data, loading } = useAsyncV('liveCounter');

  useEffect(() => {
    // Set up your realtime subscription
    const unsubscribe = firestore.collection('counter')
      .onSnapshot(doc => {
        // Update store when realtime data arrives
        setAsyncV('liveCounter', async () => doc.data());
      });

    return () => unsubscribe();
  }, []);

  return <div>Live count: {data?.count}</div>;
}
```

## API Reference

### Synchronous State

| Function | Description |
|----------|-------------|
| `setSyncV(selector, value)` | Set state at selector (supports dot notation) |
| `setSyncV(selector, updaterFn)` | Update state using previous value |
| `useSyncV(selector)` | Subscribe to state; re-renders on change |

### Asynchronous State

| Function | Description |
|----------|-------------|
| `setAsyncV(selector, asyncFn)` | Fetch and store async data |
| `useAsyncV(selector)` | Subscribe to async data `{data, loading, error}` |
| `useAsyncSubV(selector, asyncFn)` | Auto-refetch when data changes |
| `asyncRefetchV(selector, asyncFn)` | Manually trigger refetch after mutation |

### Configuration

Both async functions accept an optional config:

```jsx
{
  staleWhileRefetching: true,  // Keep old data while refetching (default: true)
  errorTimeout: 10000,         // Auto-clear error after N ms (default: 10000)
}
```

## Comparison

| Feature | useSyncV | Redux | Zustand | SWR | React Query |
|---------|----------|-------|---------|-----|-------------|
| Boilerplate | None | High | Low | Low | Low |
| TypeScript | Full | Full | Full | Full | Full |
| Sync State | Yes | Yes | Yes | No | No |
| Async State | Yes | No | No | Yes | Yes |
| Dot notation | Yes | No | No | No | No |
| Auto-refetch | Yes | No | No | Yes | Yes |
| SSR/Next.js | Yes | Yes | Yes | Yes | Yes |

## Example with Next.js

```jsx
// app/dashboard/page.jsx
import { setAsyncV, useAsyncV } from 'use-sync-v';

export default function Dashboard() {
  const { data: stats, loading } = useAsyncV('dashboardStats');

  useEffect(() => {
    setAsyncV('dashboardStats', async () => {
      const res = await fetch('https://api.example.com/stats');
      return res.json();
    });
  }, []);

  if (loading) return <DashboardSkeleton />;
  return <StatsGrid data={stats} />;
}
```

## License

ISC

## Links

- [Documentation](https://vikyw89.github.io/useSyncV/)
- [NPM Package](https://www.npmjs.com/package/use-sync-v)
- [GitHub Repository](https://github.com/vikyw89/useSyncV)
