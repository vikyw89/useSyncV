import { Box, Button, Typography } from "@mui/material";
import { debugSyncV, updateSyncV, useSyncV } from "use-sync-v";

export default function CardComponent({ props }) {
  const data = useSyncV(props);

  return (
    <>
      <Box
        sx={{
          border: "1px solid grey",
          color: "white",
          display: "grid",
          gridTemplateColumns:'repeat(auto-fit, minmax(250px, 1fr))',
          gridAutoRows: '1fr',
        }}
      >
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          useSyncV("{props}") =
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
