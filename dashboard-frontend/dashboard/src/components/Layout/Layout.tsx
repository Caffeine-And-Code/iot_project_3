import { Box, Stack } from "@mui/material";
import SideBar from "./SideBar";
import React, { ReactNode } from "react";
import Dashboard from "../../Pages/Dashboard";
import ThemeProvider from "./ThemeProvider";

function Layout() {
  const [renderedComponent, setRenderedComponent] = React.useState<ReactNode>(
    <Dashboard />
  );

  const handleComponentChange = (component: ReactNode) => {
    setRenderedComponent(component);
  };

  return (
    <ThemeProvider>
      <Box sx={{ height: "100%", width: "100%" }}>
        <Stack
          spacing={2}
          direction={"column"}
          sx={{ padding: 2 }}
          justifyContent={"flex-start"}
        >
          <SideBar onActionClick={handleComponentChange} />
          <Box sx={{ height: "100%", width: "100%" }}>{renderedComponent}</Box>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

export default Layout;
