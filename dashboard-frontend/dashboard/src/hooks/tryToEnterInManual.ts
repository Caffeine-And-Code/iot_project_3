import debug from "../config/systemVariables";
import { Modes } from "./getModes";

export default async function tryToEnterInManual({arduinoMode}:{arduinoMode:Modes}) : Promise<boolean|string> {
    return new Promise((resolve, reject) => {
        if(arduinoMode == Modes.Automatic){
            if(debug){
                // debug mode
                console.log("Debug mode: tryToEnterInManual");
                resolve(true);
                return;
            }

            // send the command to the server
            fetch("/api/manual", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({mode: Modes.Manual}),
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
        }
    });
}