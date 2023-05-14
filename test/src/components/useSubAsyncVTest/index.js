import { Box, Button, Typography } from '@mui/material';
import { setAsyncV, useSubAsyncV } from 'use-sync-v';

const asyncFn = async () => {
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    return data;
};

export const UseSubAsyncVTest = () => {
    const subAsyncVData = useSubAsyncV('randomUser', asyncFn)

    const refetchHandler = async () => {
        setAsyncV('randomUser', async (p) => {
            return p
        })
    }
    return (
        <Box>
            {subAsyncVData.loading && <Typography>Loading</Typography>}
            {subAsyncVData.data && <Typography>{JSON.stringify(subAsyncVData.data)}</Typography>}
            {subAsyncVData.error && <Typography>error</Typography>}
            <Box sx={{ display: 'flex' }}>
                <Button variant="contained" onClick={refetchHandler}>refetch</Button>
                <Typography>USE SUB ASYNC V TEST</Typography>
            </Box>
        </Box>
    )
}