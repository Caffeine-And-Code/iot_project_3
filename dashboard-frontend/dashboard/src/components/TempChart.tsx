import { LineChart } from "@mui/x-charts";
import getTemperatures from "../hooks/getTemperatures";

function TempChart() {
  const temperatures = getTemperatures();
  return (
    <LineChart
      xAxis={[{ data: temperatures.map((_, index) => index) }]}
      series={[
        {
          data: temperatures,
        },
      ]}
      width={500}
      height={300}
      grid={{ vertical: true, horizontal: true }}
    />
  );
}

export default TempChart;
