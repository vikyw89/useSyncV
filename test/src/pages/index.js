import CardComponent from "@/components/card";
import { Box, Button, Typography } from "@mui/material";
import { Inter } from "next/font/google";
import {
  debugSyncV,
  readSyncV,
  updateAsyncV,
  updateSyncV,
  useAsyncV,
  useQueryV,
  useSyncV,
} from "use-sync-v";

const inter = Inter({ subsets: ["latin"] });

const asyncFn = async () => {
  const response = await fetch("https://randomuser.me/api/");
  const data = await response.json();
  return data;
};

// updateSyncV("test",{
//   quote: asyncFn()
// })

export default function Home() {
  const selector = "api";
  const data = useAsyncV("api");
  // const data = useQueryV(selector, async () => {
  //   const response = await fetch("https://catfact.ninja/fact");
  //   const data = await response.json();
  //   return data.fact;
  // });

  // debugSyncV(selector);
  const refetchHandler = () => {
    updateAsyncV(selector, asyncFn);
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
        {data.data && <Typography>{JSON.stringify(data.data)}test</Typography>}
        {data.error && <Typography>error</Typography>}
        <Button onClick={refetchHandler}>refetch</Button>
        <CardComponent props={"users[0].id"} />
        <CardComponent props={"users[0]"} />
      </Box>
    </>
  );
}
