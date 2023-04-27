import CardComponent from '@/components/card';
import { Box, Button, Typography } from '@mui/material';
import { useEffect } from 'react';
import { updateAsyncV, useQueryV, useAsyncV } from 'use-sync-v';
import { useAsyncVDefaultConfig } from 'use-sync-v/dist/lib/useAsyncV';
import { useQueryVDefaultConfig } from 'use-sync-v/dist/lib/useQueryV';

const asyncFn = async () => {
  const response = await fetch('https://randomuser.me/api/');
  const data = await response.json();
  console.log('downloading');
  return data;
};

export default function Home() {
  const selector = 'api';
  // const data = useQueryV(selector, asyncFn);
  const data = useAsyncV(selector);
  useEffect(() => {
    updateAsyncV(selector, asyncFn);
  }, []);

  const refetchHandler = () => {
    updateAsyncV(selector, asyncFn);
  };
  console.log(useAsyncVDefaultConfig)
  console.log('render');
  // debugSyncV()
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
        {data.loading && <Typography>Loading</Typography>}
        {data.data && <Typography>{JSON.stringify(data.data)}test</Typography>}
        {data.error && <Typography>error</Typography>}
        <Button onClick={refetchHandler}>refetch</Button>
        <CardComponent props={'users[0].id'} />
        <CardComponent props={'users[0]'} />
      </Box>
    </>
  );
}
