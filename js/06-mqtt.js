const mqtt = require('mqtt');

const brokerUrl = 'mqtt://test.mosquitto.org'; // Replace with your MQTT broker URL
const topic = 'test_topic';




class MqttHandler {
    constructor(url = 'mqtt://test.mosquitto.org', topic = 'test_topic') {
        this.brokerUrl = url;
        this.topic =  topic
        this.client = mqtt.connect(this.brokerUrl);
    }

    async publish(message) {
        this.client.publish(this.topic, message);
        console.log('Published:', message);
    }

    async subscribe() {
        this.client.on('message', (topic, message) => {
            console.log('Received message:', message.toString());
        });
    }

    async connect() {
        this.client.on('connect', () => {
            console.log('Connected to MQTT broker');
        });

        this.client.on('error', (error) => {
            console.error('Error occurred:', error);
        });
    }
    async listen() {
        this.client.subscribe(this.topic);

        this.client.on('connect', () => {
            console.log('Connected to MQTT broker');
        });

        this.client.on('error', (error) => {
            console.error('Error occurred:', error);
        });

        this.client.on('message', (topic, message) => {
            console.log('Received message:', message.toString());
        });

    }
}



const mqttHandler = new MqttHandler(brokerUrl, topic);
mqttHandler.connect();

mqttHandler.publish('Hello, MQTT!');
mqttHandler.listen();
