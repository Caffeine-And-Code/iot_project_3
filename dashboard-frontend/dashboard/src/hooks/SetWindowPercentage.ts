import debug from "../config/systemVariables";
import { Modes } from "./getModes";

export default async function SetWindowPercentage({percentage}:{percentage:number}) : Promise<boolean|string> {
    return new Promise((resolve, reject) => {
        if(debug){
            // debug mode
            console.log("Debug mode: SetWindowPercentage");
            resolve(true);
            return;
        }

        // send the command to the server
        fetch("/percentage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({percentage:percentage}),
        })
            .then((res) => {
                if (res.ok) {
                    tryToEnterInAutomatic().then((res) => {
                        if(res === true){
                            resolve(true);
                        } else {
                            reject(res);
                        }
                    });
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

async function tryToEnterInAutomatic() : Promise<boolean|string> {
    return new Promise((resolve, reject) => {
            if(debug){
                // debug mode
                console.log("Debug mode: tryToEnterInAutomatic");
                resolve(true);
                return;
            }

            // send the command to the server
            fetch("/automatic", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({mode: Modes.Automatic.valueOf()}),
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
    );
}