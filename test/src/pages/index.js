import { Inter } from "next/font/google";
import { Box, sliderClasses, Typography } from "@mui/material";
import CardComponent from "@/components/card";
import {
  createSyncV,
  debugSyncV,
  emitChange,
  useAsyncV,
  useSyncV,
} from "use-sync-v";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

const asyncFn = async () => {
  const response = await fetch("https://catfact.nin");
  const data = await response.json()
  return data.fact;
};

export default function Home() {
  const selector = "api";

  const data =  useAsyncV(selector, asyncFn);
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
        {data.data && <Typography>data</Typography>}
        {data.error && <Typography>error</Typography>}
        <CardComponent props={"users[0].id"} />
        <CardComponent props={"users[0]"} />
      </Box>
    </>
  );
}
