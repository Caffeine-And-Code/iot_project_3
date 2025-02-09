import debug from "../config/systemVariables";

export default async function SetWindowPercentage({percentage}:{percentage:number}) : Promise<boolean|string> {
    return new Promise((resolve, reject) => {
        if(debug){
            // debug mode
            console.log("Debug mode: SetWindowPercentage");
            resolve(true);
            return;
        }

        // send the command to the server
        fetch("/api/manual", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({percentage}),
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