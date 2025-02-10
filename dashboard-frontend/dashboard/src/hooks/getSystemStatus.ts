import debug from "../config/systemVariables";

enum SystemStatus{
    Normal = 0,
    Hot = 1,
    TooHot = 2,
    Alarm = 3
}

function getSystemStatus(msg:string): SystemStatus {
    if(debug){
        //debug mode 
        const random = Math.floor(Math.random() * 4);
        return SystemStatus[random as unknown as keyof typeof SystemStatus];
    }

    const data = JSON.parse(msg);
    if(data["applicationState"] && SystemStatus[data["applicationState"]]){
        const val = SystemStatus[data["applicationState"]];
        return SystemStatus[val as keyof typeof SystemStatus];
    }

    throw new Error("Invalid system status");
}

export { SystemStatus, getSystemStatus };