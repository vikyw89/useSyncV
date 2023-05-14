import { useEffect } from "react";
import { setAsyncV, useAsyncV } from "use-sync-v";
import { Box, Button, Typography } from '@mui/material';

const asyncFn = async () => {
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    return data;
};

export const UseAsyncVTest = () => {
    const data = useAsyncV('useAsyncV')

    useEffect(() => {
        setAsyncV('useAsyncV', asyncFn)
    }, [])

    const refetchHandler = async () => {
        setAsyncV('useAsyncV', asyncFn)
    }
    return (
        <Box>
            {data.loading && <Typography>Loading</Typography>}
            {data.data && <Typography>{JSON.stringify(data.data)}</Typography>}
            {data.error && <Typography>error</Typography>}
            <Box sx={{ display: 'flex' }}>
                <Button variant="contained" onClick={refetchHandler}>refetch</Button>
                <Typography>USE ASYNC V TEST</Typography>
            </Box>
        </Box>
    )
}