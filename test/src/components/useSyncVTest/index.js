import { Box, Button, Typography } from '@mui/material';
import { useEffect } from 'react';
import { setSyncV, useSyncV } from 'use-sync-v';

export const UseSyncVTest = () => {
    const syncVData = useSyncV('counter')
    useSyncV
    useEffect(() => {
        setSyncV('counter', 0)
    }, [])
    
    const incrementHandler = () => {
        setSyncV('counter', p => p + 1)
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