const MQTT_BROKER = 'wss://broker.hivemq.com:8884/mqtt';
const MQTT_TOPIC = 'iot_project_3';

let client;

document.addEventListener('DOMContentLoaded', function() {
    console.log("Inizializzazione client MQTT...");

    client = mqtt.connect(MQTT_BROKER);

    client.on('connect', () => {
        console.log('Connesso al broker MQTT');
        client.subscribe(MQTT_TOPIC, (err) => {
            if (err) {
                console.error("Errore nella sottoscrizione al topic:", err);
            }
        });
    });

    client.on('error', (error) => {
        console.error("Errore di connessione MQTT:", error);
    });

    client.on('message', (topic, message) => {
        console.log(`Messaggio ricevuto: ${message.toString()}`);
        displayMessage(message.toString());
    });

    client.on('close', () => {
        console.warn("Connessione chiusa. Riconnessione in corso...");
    });
});

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();

    if (!isNaN(message) && parseFloat(message) == message) {
        const floatMessage = `F${message}`;
        if (client && client.connected) {
            client.publish(MQTT_TOPIC, floatMessage);
            messageInput.value = '';
        } else {
            console.error("Errore: MQTT client non connesso!");
        }
    } else {
        console.error("Errore: Inserire un valore float valido!");
    }
}

function displayMessage(message) {
    const messageList = document.getElementById('messageList');
    const listItem = document.createElement('li');
    listItem.textContent = message;
    messageList.appendChild(listItem);
}
