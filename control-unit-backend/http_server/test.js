const {getPort, listen, sendMessage} = require("./services/serialService");

const arduinoConnectionTest = async() => {
    const port  = await getPort("COM3", 9600)
    console.log("opened")
    listen(port, (mess) => console.log(mess));
    console.log("listening")
    await sendMessage(port, "uno")
    console.log("sended")
}

main()