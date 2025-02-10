import debug from "../config/systemVariables";

export default function getTemperatures(msg: string) : { letture: number; temperature: number }[] {
  if (debug) {
    // debug Mode
    // get a random number between 0 and 100
    const length = Math.floor(Math.random() * 10) + 1;
    // create an array of length length and fill it with random numbers
    const temperatures = Array.from({ length }, () => Math.random() * 100);
    return temperatures.map((temperature, index) => ({
      letture: index,
      temperature: temperature,
    }));
  }

    const data = JSON.parse(msg);
    if("temperatureHistory" in data){
        const temperatures = data["temperatureHistory"];
        return temperatures.map((temperature:number, index:number) => ({
            letture: index,
            temperature: Number(temperature),
        }));
    }

    throw new Error("Invalid temperature data");
}
