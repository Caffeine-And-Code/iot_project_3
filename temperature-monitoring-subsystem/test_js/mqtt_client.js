const MQTT_BROKER = 'wss://broker.hivemq.com:8884/mqtt';
const MQTT_TOPIC = 'iot_project_3';

let client;

/* Function to connect and set the callback function */
function connectMQTT(callback) {
    client = mqtt.connect(MQTT_BROKER);
    console.log("Initializing MQTT client...");

    client.on('connect', () => {
        console.log('Connected to MQTT broker');
        client.subscribe(MQTT_TOPIC, (err) => {
            if (err) {
                console.error("Error subscribing to topic: ", err);
                connect(callback);
            }
        });
    });

    client.on('error', (error) => {
        console.error("MQTT connection error: ", error);
        connect(callback);
    });

    client.on('message', (topic, message) => {
        callback(message.toString());
    });

    client.on('close', () => {
        console.warn("Connection closed. Reconnecting...");
        connect(callback);
    });
}

/* Function to send frequency, value is float */
function sendMQTT(value) {
    if (typeof value === 'number' && !isNaN(value) && parseFloat(value) == value) {
        const floatMessage = `F${value}`;
        if (client && client.connected) {
            client.publish(MQTT_TOPIC, floatMessage);
        } else {
            console.error("Error: MQTT client not connected!");
            connect();
        }
    } else {
        console.error("Error: Please enter a valid float value!");
    }
}

/////////////////////////////////////////////////////////////////////////

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    const value = parseFloat(message);

    sendMQTT(value);
    
    messageInput.value = '';
}

function useMessage(message){
    const temp = parseFloat(message.slice(1));
    if (message.startsWith('T') && !isNaN(temp)) {
        const messageList = document.getElementById('messageList');
        const listItem = document.createElement('li');
        listItem.textContent = temp;
        if (messageList.firstChild) {
            messageList.insertBefore(listItem, messageList.firstChild);
        } else {
            messageList.appendChild(listItem);
        }
    } else {
        console.warn("Messaggio ignorato: non inizia con 'T' seguito da un float");
    }
}

function connect() {
    connectMQTT(useMessage);
}
