import { Box, Stack } from "@mui/material";
import SideBar from "./SideBar";
import React, { ReactNode } from "react";
import Dashboard from "../../Pages/Dashboard";
import ThemeProvider from "./ThemeProvider";

function Layout() {
  const handleComponentChange = (component: ReactNode) => {
    setRenderedComponent(component);
  };
  
  const [renderedComponent, setRenderedComponent] = React.useState<ReactNode>(
    <Dashboard goToClicked={handleComponentChange}/>
  );


  return (
    <ThemeProvider>
      <Box sx={{ height: "100%", width: "100%" }}>
        <Stack
          spacing={2}
          direction={"column"}
          sx={{ height: "100%" }}
          justifyContent={"center"}
        >
          <SideBar onActionClick={handleComponentChange} />
          <Box sx={{ height: "100%", width: "100%",display:"flex",justifyContent:"center" }}>{renderedComponent}</Box>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

export default Layout;
