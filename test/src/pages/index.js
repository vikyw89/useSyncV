import { Box, Button, Typography } from '@mui/material';
import { useEffect } from 'react';
import { setAsyncV, setSyncV, useAsyncV, useSubAsyncV, useSyncV } from 'use-sync-v';

const asyncFn = async () => {
  const response = await fetch('https://randomuser.me/api/');
  const data = await response.json();
  return data;
};

export default function Home() {
  const counter = useSyncV('counter')
  console.log('rerender')
  const selector = 'api';
  const data = useSubAsyncV(selector, asyncFn)

  const refetchHandler = async () => {
    // const response = await setAsyncV(selector, asyncFn);
    setAsyncV(selector, async (p) => {
      const data = await asyncFn()
      console.log("🚀 ~ file: index.js:21 ~ setAsyncV ~ data:", data)
      const returnValue = 'test'
      console.log("🚀 ~ file: index.js:23 ~ setAsyncV ~ returnValue:", returnValue)
      return returnValue
    })
  }

  useEffect(() => {
    setSyncV('counter', 1)
  }, [])
  const incrementCounter = () => {
    setSyncV('counter', p => p + 1)
  }
  return (
    <>
      <Box
        sx={{
          height: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          height: 'auto',
          margin: '30px',
          justifyContent: 'center',
          gap: '10px'
        }}
      >
        <Typography>
          counter: &nbsp;{counter}
        </Typography>
        <Button onClick={incrementCounter}>increment</Button>
        {data.loading && <Typography>Loading</Typography>}
        {data.data && <Typography>{JSON.stringify(data.data)}test</Typography>}
        {data.error && <Typography>error</Typography>}
        <Button onClick={refetchHandler}>refetch</Button>
        {/* <CardComponent props={'users[0].id'} />
        <CardComponent props={'users[0]'} /> */}
      </Box>
    </>
  );
}
