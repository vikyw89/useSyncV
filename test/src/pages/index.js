import { Inter } from "next/font/google";
import { Box } from "@mui/material";
import CardComponent from "@/components/card";
import { setNewStore } from "use-sync-v";

const inter = Inter({ subsets: ["latin"] });

setNewStore.a = 4
setNewStore.b = {
  5: 10
}
setNewStore.c = {
  c:67
}

export default function Home() {
  return (
    <>
      <Box
        sx={{
          height: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          margin: "30px",
          justifyContent: "center",
        }}
      >
        <CardComponent props={"a"} />
        <CardComponent props={"a"} />
        <CardComponent props={"b[5]"} />
        <CardComponent props={"b['5']"} />
        <CardComponent props={`c['c']`} />
        <CardComponent props={`c.c`} />
      </Box>
    </>
  );
}
