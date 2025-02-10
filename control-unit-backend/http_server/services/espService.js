const mqtt = require("mqtt") 

const MQTT_BROKER = 'wss://broker.hivemq.com:8884/mqtt';
const MQTT_TOPIC = 'iot_project_3';

let client;

/* Function to connect and set the callback function (the callback function must accept a string) */
function connectMQTT(callback)
{
    return new Promise((resolve, reject) =>
    {
        client = mqtt.connect(MQTT_BROKER);
    console.log("Initializing MQTT client...");

        client.on('connect', () =>
        {
            resolve()
            console.log('Connected to MQTT broker');
            client.subscribe(MQTT_TOPIC, (err) => {
            if (err) {
                console.error("Error subscribing to topic: ", err);
                connectMQTT(callback);
            }
        });
    });

    client.on('error', (error) => {
        console.error("MQTT connection error: ", error);
        connectMQTT(callback);
    });

    client.on('message', (topic, message) =>
    {
        /** @type {string} */
        const m = message.toString()
        if (m.startsWith("T"))
        {
            const temperature = m.slice(1)
            callback(temperature)
        }
    });

    client.on('close', () => {
        console.warn("Connection closed. Reconnecting...");
        connectMQTT(callback);
    });  
    })
}

/* Function to send frequency, value is float */
function sendMQTT(value) {
    if (typeof value === 'number' && !isNaN(value) && parseFloat(value) == value) {
        const floatMessage = `F${value}`;
        if (client && client.connected) {
            client.publish(MQTT_TOPIC, floatMessage);
        } else {
            console.error("Error: MQTT client not connected!");
        }
    } else {
        console.error("Error: Please enter a valid float value!");
    }
}


module.exports = {
    connectMQTT,
    sendMQTT
}