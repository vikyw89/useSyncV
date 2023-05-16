import { Box, Button, Typography } from '@mui/material';
import { useEffect } from 'react';
import { setSyncV, useSyncV, getSyncV } from 'use-sync-v';

export const UseSyncVTest = () => {
    const syncVData = useSyncV('counter')
    console.log("🚀 ~ file: index.js:7 ~ UseSyncVTest ~ syncVData:", syncVData)

    useEffect(() => {
        setSyncV('counter', 0)
        // return () => {
        //     setSyncV('counter', 0)
        // }
    }, [])

    const incrementHandler = () => {
        setSyncV('counter', p => p + 1)
        setSyncV('counter', p => p + 1)
        setSyncV('counter', p => p + 1)
        const value = getSyncV('counter')
    }

    return (
        <Box>
            {syncVData && <Typography>{JSON.stringify(syncVData)}</Typography>}
            <Box sx={{ display: 'flex' }}>
                <Button variant="contained" onClick={incrementHandler}>increment</Button>
                <Typography>USE SYNC V TEST</Typography>
            </Box>
        </Box>
    )
}