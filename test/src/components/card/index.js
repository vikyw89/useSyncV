import { Box, Button, Typography } from "@mui/material";

export default function CardComponent({ props }) {

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
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          3
        </Typography>
        <Button variant="contained">Increment</Button>
        <Button variant="contained">Decrement</Button>
      </Box>
    </>
  );
}
