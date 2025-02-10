const MQTT_BROKER = 'wss://broker.hivemq.com:8884/mqtt';
const MQTT_TOPIC = 'iot_project_3';

let client;

/* funzione per la connessione */
function connect() {
    client = mqtt.connect(MQTT_BROKER);
    console.log("Inizializzazione client MQTT...");

    client.on('connect', () => {
        console.log('Connesso al broker MQTT');
        client.subscribe(MQTT_TOPIC, (err) => {
            if (err) {
                console.error("Errore nella sottoscrizione al topic:", err);
                connect();
            }
        });
    });

    client.on('error', (error) => {
        console.error("Errore di connessione MQTT:", error);
        connect();
    });

    client.on('message', (topic, message) => {
        console.log(`Messaggio ricevuto: ${message.toString()}`);
        tryReturn(useMessage(message.toString()));
    });

    client.on('close', () => {
        console.warn("Connessione chiusa. Riconnessione in corso...");
        connect();
    });
}

function tryReturn(value) {
    console.log("You returned " + value);
}

/* Funzione per inviare la frequenza */
function sendFloatMessage(value) {
    if (typeof value === 'number' && !isNaN(value) && parseFloat(value) == value) {
        const floatMessage = `F${value}`;
        if (client && client.connected) {
            client.publish(MQTT_TOPIC, floatMessage);
            console.log(`Messaggio inviato: ${floatMessage}`);
        } else {
            console.error("Errore: MQTT client non connesso!");
            connect();
        }
    } else {
        console.error("Errore: Inserire un valore float valido!");
    }
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();

    sendFloatMessage(parseFloat(message));
    
    messageInput.value = '';
}

function useMessage(message){
    const temp = parseFloat(message.slice(1));
    if (message.startsWith('T') && !isNaN(temp)) {
        const messageList = document.getElementById('messageList');
        const listItem = document.createElement('li');
        listItem.textContent = temp;
        messageList.appendChild(listItem);
        return temp;
    } else {
        console.warn("Messaggio ignorato: non inizia con 'T' seguito da un float");
        return NaN;
    }
}
