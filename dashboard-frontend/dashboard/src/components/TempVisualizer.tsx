import React from "react";
import useIsMobile from "../hooks/isMobile";
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { SystemStatus } from "../hooks/getSystemStatus";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import CalculateIcon from "@mui/icons-material/Calculate";
import SystemSecurityUpdateWarningIcon from "@mui/icons-material/SystemSecurityUpdateWarning";
import { useDataContext } from "./Layout/DataGetter/DataContext";
import AdjustIcon from "@mui/icons-material/Adjust";
import setSystemStatus from "../hooks/setSystemStatus";
import SkeletonListItem from "./Layout/SkeletonListItem";

interface TempVisualizerProps {
  temperatures: { temperature: number; letture: number }[];
  isCard: boolean;
}

function TempVisualizer({ temperatures, isCard = false }: TempVisualizerProps) {
  const isMobile = useIsMobile();
  const { systemStatus } = useDataContext();
  const [isLoading, setIsLoading] = React.useState(false);
  
  const formatData = (data: { temperature: number; letture: number }[]) => {
    const temp = data.map((el) => parseFloat(el.temperature.toFixed(2)));
    const letture = data.map((el) => el.letture);
    return { temp, letture };
  };

  const getMin = (data: number[]) => {
    return Math.min(...data);
  };
  
  const getMax = (data: number[]) => {
    return Math.max(...data);
  };
  
  const getAvg = (data: number[]) => {
    return (data.reduce((acc, el) => acc + el, 0) / data.length).toFixed(2);
  };

  const getCurrent = (data: number[]) => {
    return data[data.length - 1];
  };

  const statusFormatter = (status: SystemStatus) => {
    const ss = SystemStatus[status].valueOf();
    if (parseInt(ss) === SystemStatus.TooHot.valueOf()) {
      return "Too Hot";
    }
    return status;
  };
  
  const handleRequest = async () => {
    setIsLoading(true);
    await setSystemStatus();
    setIsLoading(false);
  };

  React.useEffect(() => {
    setIsLoading(getCurrent(formatData(temperatures).temp) == undefined);
  }, [temperatures]);

  return (
    <Stack
      spacing={2}
      direction={"column"}
      justifyContent="flex-start"
      sx={{
        width: "100%",
        height: "100%",
        paddingLeft: isMobile ? "0px" : isCard ? "0px" : "20xp",
      }}
    >
      <Typography variant="h4" align="center">
        {!isCard && "System Overview"}
      </Typography>
      {getCurrent(formatData(temperatures).temp) == undefined ? (
        <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: isCard ? "primary" : "background.paper",
          marginTop: isCard ? "0px !important" : "20px",
        }}
      >
        <SkeletonListItem />
        <SkeletonListItem />
        <SkeletonListItem />
        <SkeletonListItem />
        <SkeletonListItem />
      </List>
      ) : (
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: isCard ? "primary" : "background.paper",
            marginTop: isCard ? "0px !important" : "20px",
          }}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <SystemSecurityUpdateWarningIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={statusFormatter(systemStatus)}
              secondary="System Current Status"
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ThermostatIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={getCurrent(formatData(temperatures).temp) + "°C"}
              secondary="Current Temperature"
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <KeyboardDoubleArrowUpIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={getMax(formatData(temperatures).temp) + "°C"}
              secondary="Max Temperature Recorded"
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <KeyboardDoubleArrowDownIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={getMin(formatData(temperatures).temp) + "°C"}
              secondary="Min Temperature Recorded"
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <CalculateIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={getAvg(formatData(temperatures).temp) + "°C"}
              secondary="Average Temperature of the System"
            />
          </ListItem>
        </List>
      )}
      <Button
        variant="contained"
        loading={isLoading}
        onClick={handleRequest}
        startIcon={<AdjustIcon />}
        sx={{ marginBottom: "16px !important" }}
        disabled={
          !(
            parseInt(SystemStatus[systemStatus].valueOf()) == SystemStatus.Alarm
          )
        }
      >
        Adjust System
      </Button>
    </Stack>
  );
}

export default TempVisualizer;
