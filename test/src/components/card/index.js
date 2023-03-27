import { Box, Button, Typography } from "@mui/material";
import { debugSyncV, updateSyncV, useSyncV } from "use-sync-v";

export default function CardComponent({ props }) {
  const data = useSyncV(props);

  return (
    <>
      <Box
        sx={{
          color: "white",
          display: "flex",
          flexDirection:'column',
          height:'auto',
          width:'auto',
          gap:'10px',
          border:'1px solid white',
          borderRadius:'20px',
          padding:'10px'
        }}
      >
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          useSyncV("{props}") =
        </Typography>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          {JSON.stringify(data)}
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
