import debug from "../config/systemVariables";
import { SystemStatus } from "./getSystemStatus";

export default async function setSystemStatus(){
    // send a request to the server to change the system status
    const toSend = SystemStatus.Normal;
    
    if(debug){
        console.log("toSend => ", toSend);
        // wait 1 second to simulate the request
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                console.log("System status changed");
                resolve();
            }, 1000);
        });
    }

    fetch("http://localhost:3001/setSystemStatus", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({status: toSend}),
    })
}