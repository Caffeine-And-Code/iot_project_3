const { initialize, askCommunication, sendOpenPercentage, sendTemperature } = require("./windowControllerService");
const { modes, states } = require("../enums")
const {send} = require("../socket")

const T1 = 20
const T2 = 40

const F1 = 20
const F2 = 30

const DT = 5000

const PERC_MAX = 100
const PERC_MIN = 0.01

const SKIP_ARDUINO = false



let history = []
let currentMode = modes.automatic
let currentState = states.normal
let arduinoMode = modes.automatic
let currentOpenPercentage = 0
let lastTooHotTimeStamp = undefined
let busy = false;

const begin =async (port) =>
{
    await initialize(port)
    askCommunication((mode) =>
    {
        while (busy) { }
        busy = true
        console.log("new mode", mode);
        if (arduinoMode != mode)
        {
            arduinoMode = mode
            sendData()   
        }
        busy = false
    }, (percentage) =>
    {
        while (busy) { }
        busy = true
        console.log("new percentage", percentage);
        if (percentage != currentOpenPercentage)
        {
            currentOpenPercentage = percentage
            sendData()    
        }      
        busy = false
    })
}

const getArduinoMode = () => {
    return arduinoMode
}

const getCurrentState = () => {
    return currentState
}

const getCurrentMode = () => {
    return currentMode
}

const getCurrentOpenPercentage = () => {
    return currentOpenPercentage
}

const getWindowOpenPercentage = (t) => {
    if (t < T1) return 0
    if (t > T2) return 100
    return Math.round(((PERC_MAX - PERC_MIN) * (t - T1) / (T2-T1)) + PERC_MIN)
}

const getWindowState = (t) => {
    if (t < T1) return states.normal
    if (t >= T1 && t <= T2) return states.hot
    if (t > T2) {
        const ts = Date.now()
        if(lastTooHotTimeStamp === undefined){
            lastTooHotTimeStamp = ts
        }
        
        if (ts - lastTooHotTimeStamp >= DT){
            return states.alarm
        }
        return states.too_hot
    }

}

const saveTemperature = (t) => {
    history.push(t)
    !SKIP_ARDUINO && sendTemperature(t)
}

const getTemperatureHistory = () =>
{
    return history
}

const getLastTemperature = () =>
{
    if (history.length > 0)
    {
        return history.slice(-1)[0]        
    }
    return 0;
}

const processTemperature = (t) =>
{
    if (currentState !== states.alarm)
    {
        if (currentMode === modes.automatic)
        {
            currentOpenPercentage = getWindowOpenPercentage(t)
            currentState = getWindowState(t)   
        }
    }
    saveTemperature(t)
    sendData()
}

const passToManualMode = async () => {
    currentMode = modes.manual
    sendData()

}

const passToAutomaticMode = async () => {
    currentMode = modes.automatic
    sendData()
}

const editPercentage = async (percentage) =>
{
    if(getCurrentMode() !== modes.manual) throw new Error("Can't edit percentage in automatic mode")
    if (percentage < 0 || percentage > 100) throw new Error("Invalid percentage value")
    currentOpenPercentage = percentage
    sendData()    
    await sendOpenPercentage(percentage)
}

const resolveAlarm = async () =>
{
    currentState = states.too_hot
    sendData()
}

const sendData = () =>
{
 send("data", getData())   
}

const getData = () => {
  return {
    mode:getCurrentMode(),
    percentage: getCurrentOpenPercentage(),
    arduinoMode: getArduinoMode(),
    temperature: getLastTemperature(),
    applicationState: getCurrentState(),
    temperatureHistory: history
  }
}

module.exports = {
    begin,
    getArduinoMode,
    getCurrentState,
    getCurrentMode,
    getCurrentOpenPercentage,
    processTemperature,
    passToManualMode,
    passToAutomaticMode,
    editPercentage,
    getTemperatureHistory,
    getLastTemperature,
    resolveAlarm,
    getData,
    sendData
}