import debug from "../config/systemVariables";

export enum Modes{
    Undefined = -1,
    Automatic = 1,
    Manual = 2
}

export function getArduinoMode(msg: string): Modes{
    if(debug){
        return Modes.Automatic;
    }
    const parsed = JSON.parse(msg);
    return parsed["arduinoMode"];
}

export function getSystemMode(msg: string): Modes{
    if(debug){
        return Modes.Automatic;
    }
    const parsed = JSON.parse(msg);
    return parsed["mode"];
}