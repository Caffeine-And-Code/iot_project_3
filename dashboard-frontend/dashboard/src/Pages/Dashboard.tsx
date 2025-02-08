import React from "react";
import Helmet from "../components/Layout/Helmet";
import TempVisualizer from "../components/TempVisualizer";
import getTemperatures from "../hooks/getTemperatures";
import requestInterval from "../config/systemVariables";
import DashboardCard from "../components/DashboardCard";
import AssessmentIcon from "@mui/icons-material/Assessment";
import Temperature from "./Temperature";
import { Grid2 } from "@mui/material";
import WindowVisualizer from "../components/WindowVisualizer";
import getWindowPercentage from "../hooks/getWindowPercentage";
import Window from "./Window";
import WindowTwoToneIcon from '@mui/icons-material/WindowTwoTone';

interface DashboardProps {
  goToClicked: (component: React.ReactNode) => void;
}

function Dashboard({ goToClicked }: DashboardProps) {
  const [temperatures, setTemp] = React.useState(getTemperatures() ?? []);
  const [percentage, setPerc] = React.useState(getWindowPercentage() ?? []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTemp(getTemperatures());
      setPerc(getWindowPercentage());
    }, requestInterval);

    return () => clearInterval(interval);
  }, []);

  return (
    <Helmet title="Dashboard">
      <Grid2 container spacing={3}  sx={{ width: "100%" }} justifyContent={"center"} alignItems={"start"}>
        <Grid2 size={{ xs: 12, md: 4 }} justifyContent={"center"} alignItems={"center"} display={"flex"}>
          <DashboardCard
            title="Temperatures Overview"
            icon={<AssessmentIcon />}
            onRedirect={() => goToClicked(<Temperature />)}
          >
            <TempVisualizer temperatures={temperatures} isCard />
          </DashboardCard>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }} justifyContent={"center"} alignItems={"center"} display={"flex"}>
          <DashboardCard
            title="Window Control Panel"
            icon={<WindowTwoToneIcon />}
            onRedirect={() => goToClicked(<Window />)}
          >
            <WindowVisualizer percentage={percentage} isCard/>
          </DashboardCard>
        </Grid2>
      </Grid2>
    </Helmet>
  );
}

export default Dashboard;
