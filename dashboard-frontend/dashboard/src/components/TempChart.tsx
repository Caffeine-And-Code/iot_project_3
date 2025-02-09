import { LineChart } from "@mui/x-charts";
import React from "react";

interface TempChartProps {
  containerRef: React.RefObject<HTMLDivElement|null>;
  temperatures: { letture: number; temperature: number; }[];
}

function TempChart({ containerRef,temperatures }: TempChartProps) {
  const [chartSize, setChartSize] = React.useState({ width: 0, height: 0 });

  //handle the resize of the chart based on the father container
  React.useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      console.log(entry.contentRect.width, entry.contentRect.height);
      setChartSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);


  return (
    <LineChart
      className="chart"
      dataset={temperatures}
      xAxis={[
        {
          dataKey: "letture",
          valueFormatter: (index) => `${index + 1}`,
        },
      ]}
      series={[
        {
          dataKey: "temperature",
          // make the value rounded to 2 decimal places
          valueFormatter: (value) => `${value?.toFixed(2)}°C`,
        },
      ]}
      slotProps={{
        noDataOverlay: {
          message: "No data available for the moment...",
        },
      }}
      width={chartSize.width}
      height={chartSize.height}
      grid={{ vertical: true, horizontal: true }}
    />
  );
}

export default TempChart;
