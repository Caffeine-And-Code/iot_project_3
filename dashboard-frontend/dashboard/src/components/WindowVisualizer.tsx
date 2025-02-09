import {
  Box,
  Paper,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts";
import React from "react";
import { useThemeContext } from "./Layout/ThemeProvider";
import DialogButton from "./DialogButton";

interface WindowVisualizerProps {
  percentage: number;
  isCard?: boolean;
}

function WindowVisualizer({ percentage,isCard }: WindowVisualizerProps) {
  const [anglePopover, setAnglePopover] = React.useState<HTMLElement | null>(
    null
  );
  const [percentagePopover, setPercentagePopover] =
    React.useState<HTMLElement | null>(null);

    const { isDarkMode } = useThemeContext();

  const handleAngle = (event: React.MouseEvent<HTMLElement>) => {
    setAnglePopover(event.currentTarget);
  };

  const handleAngleClose = () => {
    setAnglePopover(null);
  };
  const handlePercentage = (event: React.MouseEvent<HTMLElement>) => {
    setPercentagePopover(event.currentTarget);
  };

  const handlePercentageClose = () => {
    setPercentagePopover(null);
  };

  const openAngle = Boolean(anglePopover);

  const openPercentage = Boolean(percentagePopover);

  const calcAngle = (percentage: number) => {
    return parseFloat(((percentage / 100) * 90).toFixed(2));
  };

  return (
    <>
      <Paper elevation={isCard ? 0 : 3} sx={{ padding: 4, width: "100%", ...(isDarkMode && isCard && { backgroundColor: "#1E1E1E !important" }) }}>
        <Stack
          direction="row"
          id="window-visualizer"
          display={"flex"}
          flexWrap={"wrap"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            width: "100%",
          }}
        >
          {!isCard&&<Box
            aria-owns={openAngle ? "mouse-over-popover" : undefined}
            aria-haspopup="true"
            onMouseEnter={handleAngle}
            onMouseLeave={handleAngleClose}
            padding={1}
          >
            <Gauge
              width={200}
              height={150}
              value={calcAngle(percentage)}
              startAngle={-90}
              endAngle={0}
              valueMin={0}
              valueMax={90}
              innerRadius="70%"
              outerRadius="100%"
              cornerRadius="10%"
              text={() => `${calcAngle(percentage)} °`}
              sx={(theme) => ({
                [`& .${gaugeClasses.valueText}`]: {
                  fontSize: 20,
                },
                [`& .${gaugeClasses.valueArc}`]: {
                  fill: "#02B2AF",
                },
                [`& .${gaugeClasses.referenceArc}`]: {
                  fill: theme.palette.text.disabled,
                },
              })}
            />
          </Box>}

          <Box
            aria-owns={openPercentage ? "mouse-over-popover" : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePercentage}
            onMouseLeave={handlePercentageClose}
            padding={1}
          >
            <Gauge
              width={200}
              height={200}
              cornerRadius="10%"
              value={parseInt(percentage.toFixed(0))}
              startAngle={0}
              endAngle={360}
              innerRadius="70%"
              outerRadius="100%"
              text={({ value }) => `${value} %`}
              sx={(theme) => ({
                [`& .${gaugeClasses.valueText}`]: {
                  fontSize: 20,
                },
                [`& .${gaugeClasses.valueArc}`]: {
                  fill: "#02B2AF",
                },
                [`& .${gaugeClasses.referenceArc}`]: {
                  fill: theme.palette.text.disabled,
                },
              })}
            />
          </Box>
        </Stack>
      </Paper>
      {isCard&&<Box margin={2}><DialogButton /></Box>}
      <Popover
        id="mouse-over-popover"
        sx={{ pointerEvents: "none" }}
        open={openAngle}
        anchorEl={anglePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handleAngleClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>Current opening angle of the window</Typography>
      </Popover>
      <Popover
        id="mouse-over-popover"
        sx={{ pointerEvents: "none" }}
        open={openPercentage}
        anchorEl={percentagePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePercentageClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>Window opening percentage</Typography>
      </Popover>
      </>
  );
}

export default WindowVisualizer;
