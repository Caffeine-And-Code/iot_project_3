import debug from "../config/systemVariables";

export default function getWindowPercentage(msg: string) {
    if (debug) {
        // debug Mode
        // get a random number between 0 and 100
        return Math.floor(Math.random() * 100);
    }

    const data = JSON.parse(msg);
    if (data["percentage"]) {
        return data["percentage"];
    }
}