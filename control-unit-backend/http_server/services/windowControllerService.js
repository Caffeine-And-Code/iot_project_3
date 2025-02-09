const { getPort, listen, sendMessage } = require("./serialService");
const {modes, states} = require("../enums")

const SEND_PERCENTAGE_PREFIX = "P"
const SEND_TEMPERATURE_PREFIX = "T"

let arduino = null

const ensureArduino = () => {
    if (!arduino) throw new Error("Arduino not initialized")
}

const initialize = async (port) => {
    arduino = await getPort(port, 9600)
}

const sendOpenPercentage = async (percentage) => {
    ensureArduino()
    await sendMessage(arduino, `${SEND_PERCENTAGE_PREFIX}:${percentage}`)
}

const sendTemperature = async (temperature) => {
    ensureArduino()
    await sendMessage(arduino, `${SEND_TEMPERATURE_PREFIX}:${temperature}`)
}

const askCommunication = (onChangeMode, onUpdateOpenPercentage) => {
    listen(arduino, (data) =>
    {
        /**
         * @type {string} message
        */
        let message = data
        if (message.startsWith("M"))
        {
            const mode = message.slice(1) == 1 ?  modes.automatic : modes.manual
            onChangeMode(mode)
        }
        else if (message.startsWith("P"))
        {
            const percentage = Number(message.slice(1));
            onUpdateOpenPercentage(percentage)
        }

    })
}

module.exports = {
    initialize,
    sendOpenPercentage,
    sendTemperature,
    askCommunication
}