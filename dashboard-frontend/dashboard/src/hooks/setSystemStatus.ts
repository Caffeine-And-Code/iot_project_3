import debug from "../config/systemVariables";
import { SystemStatus } from "./getSystemStatus";

export default async function setSystemStatus(): Promise<boolean | string> {
  // send a request to the server to change the system status
  const toSend = SystemStatus.Normal;

  return new Promise((resolve, reject) => {
    if (debug) {
      // debug mode
      console.log("Debug mode: setSystemStatus");

      setTimeout(() => {
        console.log("System status changed");
        resolve(true);
      }, 1000);
      return;
    }

    // send the command to the server
    fetch("http://localhost:3000/control/resolve_alarm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
          
      },
      body: JSON.stringify({ status: toSend }),
    })
      .then((res) => {
        if (res.ok) {
          resolve(true);
        } else {
          reject(res.statusText);
        }
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}
