import { Box, Button, Typography } from '@mui/material';
import { asyncRefetchV, useAsyncSubV } from 'use-sync-v';

const asyncFn = async () => {
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    return data;
};

export const UseAsyncSubVTest = () => {
    const data = useAsyncSubV('randomUser', asyncFn)

    const refetchHandler = async () => {
        asyncRefetchV('randomUser', async (p) => {
            return p
        })
    }
    return (
        <Box>
            {data.loading && <Typography>Loading</Typography>}
            {data.data && <Typography>{JSON.stringify(data.data)}</Typography>}
            {data.error && <Typography>error</Typography>}
            <Box sx={{ display: 'flex' }}>
                <Button variant="contained" onClick={refetchHandler}>refetch</Button>
                <Typography>USE ASYNC SUB V TEST</Typography>
            </Box>
        </Box>
    )
}