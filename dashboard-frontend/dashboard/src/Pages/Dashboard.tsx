import React from "react";
import Helmet from "../components/Layout/Helmet";
import TempVisualizer from "../components/TempVisualizer";
import getTemperatures from "../hooks/getTemperatures";
import requestInterval from "../config/systemVariables";
import DashboardCard from "../components/DashboardCard";
import AssessmentIcon from "@mui/icons-material/Assessment";
import Temperature from "./Temperature";
import { Grid2 } from "@mui/material";

interface DashboardProps {
  goToClicked: (component: React.ReactNode) => void;
}

function Dashboard({ goToClicked }: DashboardProps) {
  const [temperatures, setTemp] = React.useState(getTemperatures() ?? []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTemp(getTemperatures());
    }, requestInterval);

    return () => clearInterval(interval);
  }, []);

  return (
    <Helmet title="Dashboard">
      <Grid2 container spacing={3}  sx={{ width: "100%" }} justifyContent={"center"} alignItems={"center"}>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <DashboardCard
            title="Temperatures Overview"
            icon={<AssessmentIcon />}
            onRedirect={() => goToClicked(<Temperature />)}
          >
            <TempVisualizer temperatures={temperatures} isCard />
          </DashboardCard>
        </Grid2>
      </Grid2>
    </Helmet>
  );
}

export default Dashboard;
