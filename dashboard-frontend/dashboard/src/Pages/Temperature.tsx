import TempChart from "../components/TempChart";
import Grid from "@mui/material/Grid2";
import TempVisualizer from "../components/TempVisualizer";
import Helmet from "../components/Layout/Helmet";
import React from "react";
import { Divider } from "@mui/material";
import useIsMobile from "../hooks/isMobile";
import getTemperatures from "../hooks/getTemperatures";
import requestInterval from "../config/systemVariables";

function Temperature() {
  const [temperatures, setTemp] = React.useState(getTemperatures() ?? []);
  //handle the get temperatures from the backend
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTemp(getTemperatures());
    }, requestInterval);

    return () => clearInterval(interval);
  }, []);
  const containerRef = React.useRef(null);
  const isMobile = useIsMobile();

  return (
    <Helmet title={"System Temperatures"}>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%" }}
      >
        <Grid
          size={{ xs: 11, sm: 7 }}
          sx={{ height: "100%", maxHeight: "400px" }}
          ref={containerRef}
        >
          <TempChart containerRef={containerRef} temperatures={temperatures} />
        </Grid>
        {isMobile ? (
          <Grid size={{ xs: 10, sm: 1 }}>
            <Divider orientation="horizontal" />
          </Grid>
        ) : (
          <Grid
            size={{ xs: 10, sm: 0 }}
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Divider orientation="vertical" />
          </Grid>
        )}
        {
          isMobile ? (
            <Grid size={{ xs: 10, sm: 3 }}>
              <TempVisualizer temperatures={temperatures} isCard={false}/>
            </Grid>
          )
          : <Grid size={{ xs: 10, sm: 4 }} sx={{ height: "100%" }}>
          <TempVisualizer temperatures={temperatures} isCard={false} />
        </Grid>
        }
      </Grid>
    </Helmet>
  );
}

export default Temperature;
