import { Box, Button, Typography } from "@mui/material";

import { debugSyncV, syncVDebugger, updateSyncV, useSyncV } from "use-sync-v";
export default function CardComponent({ props }) {
  const data = useSyncV(props);

  return (
    <>
      <Box
        sx={{
          border: "1px solid grey",
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          width: "200px",
        }}
      >
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Selector
        </Typography>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          {props}
        </Typography>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Value
        </Typography>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          {data}
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            updateSyncV(props, (p) => {
              return p + 1;
            });
            debugSyncV(props);
          }}
        >
          Increment
        </Button>
        <Button variant="contained">Decrement</Button>
      </Box>
    </>
  );
}
