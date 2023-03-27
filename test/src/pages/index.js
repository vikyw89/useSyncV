import CardComponent from "@/components/card";
import { Box, Button, Typography } from "@mui/material";
import { Inter } from "next/font/google";
import { createAsyncV, createSyncV, debugSyncV, readSyncV, updateAsyncV, useQueryV, useSyncV } from "use-sync-v";

const inter = Inter({ subsets: ["latin"] });

const asyncFn = async () => {
  const response = await fetch("https://randomuser.me/api/");
  const data = await response.json();
  return data;
};

createSyncV("test",{
  quote: asyncFn()
})


export default function Home() {
  const selector = "api";
  const test = useSyncV("test")
  const data = useQueryV(selector, async () => {
    const response = await fetch("https://catfact.ninja/fact");
    const data = await response.json();
    return data;
  });
  debugSyncV(selector);
  const refetchHandler = () => {
    createAsyncV(selector, asyncFn);
  };
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
        <Button onClick={refetchHandler}>refetch</Button>
        <div>{JSON.stringify(test)}</div>
        <CardComponent props={"users[0].id"} />
        <CardComponent props={"users[0]"} />
      </Box>
    </>
  );
}
