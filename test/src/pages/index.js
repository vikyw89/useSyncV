import { Inter } from "next/font/google";
import { Box } from "@mui/material";
import CardComponent from "@/components/card";
import { createSyncV } from "use-sync-v";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Box
        sx={{
          height: "100%",
          display: "grid",
          gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))',
          height:'auto',
          margin: "30px",
          justifyContent: "center",
          gap:'10px'
        }}
      >
        <CardComponent props={"a"} />
        <CardComponent props={"a.b"} />
        <CardComponent props={"a.b[0]"} />
        <CardComponent props={"a.b[1]"} />
        <CardComponent props={"a.b[1].c"} />
        <CardComponent props={""} />
      </Box>
    </>
  );
}
