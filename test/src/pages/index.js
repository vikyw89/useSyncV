import { UseAsyncSubVTest } from '@/components/useAsyncSubVTest';
import { UseAsyncVTest } from '@/components/useAsyncVTest';
import { UseSyncVTest } from '@/components/useSyncVTest';
import { Box } from '@mui/material';



export default function Home() {


  return (
    <>
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px'
        }}
      >
        <UseAsyncSubVTest/>
        <UseAsyncVTest/>
        <UseSyncVTest/>
      </Box>
    </>
  );
}
