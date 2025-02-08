import { Stack, Typography } from "@mui/material";
import React from "react";
import useIsMobile from "../../hooks/isMobile";

function Helmet({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string|undefined;
}) {
  const isMobile = useIsMobile();
  return (
    <Stack
      spacing={5}
      direction="column"
      justifyContent={isMobile ? "flex-start" : "center"}
      alignItems="center"
      sx={{ width: "100%",marginTop:isMobile?"0px":"105px" }}
    >
      {title && (
        <Typography variant="h3" align="center">
          {title}
        </Typography>
      )}

      {children}
    </Stack>
  );
}

export default Helmet;
