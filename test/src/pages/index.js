import { Inter } from "next/font/google";
import { Box, Button, sliderClasses, Typography } from "@mui/material";
import CardComponent from "@/components/card";
import {
  createAsyncV,
  createSyncV,
  debugSyncV,
  emitChange,
  useAsyncV,
  useSyncV,
} from "use-sync-v";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

const asyncFn = async () => {
  const response = await fetch("https://catfact.ninja/fact");
  const data = await response.json();
  return data.fact;
};

export default function Home() {
  const selector = "api";
  const [state, setState] = useState(1);
  const data = useAsyncV(selector, asyncFn);
  useEffect(() => {
    createAsyncV(selector, async () => {
      const response = await fetch(
        "https://api.coindesk.com/v1/bpi/currentprice.json"
      );
      const data = await response.json();
      return data;
    });
  });
  return (
    <>
      <Box
        sx={{
          height: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          height: "auto",
          margin: "30px",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        {data.loading && <Typography>Loading</Typography>}
        {data.data && <Typography>{JSON.stringify(data.data)}</Typography>}
        {data.error && <Typography>error</Typography>}
        <Typography>{state}</Typography>
        <Button
          onClick={() => {
            setState((p) => p + 1);
          }}
        >
          clickme
        </Button>
        <CardComponent props={"users[0].id"} />
        <CardComponent props={"users[0]"} />
      </Box>
    </>
  );
}
