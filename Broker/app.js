require('dotenv').config();
const fs = require('fs');
const axios = require('axios');
const mqtt = require('mqtt');
const HOST = process.env.HOST;
const PORT = process.env.PORT;
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const post_flight_url = process.env.API_URL;


const client = mqtt.connect({
    host: HOST,
    port: parseInt(PORT),
    username: USERNAME,
    password: PASSWORD,
    keepalive: 60000,
});

client.on('connect', () => {
    console.log('Connected');
    client.subscribe('flights/info', (err) => { // Subscribe to the topic flights/info
        if (!err) {
            console.log('Subscribed to flights/info');
        }
    });
    client.subscribe('flights/requests', (err) => {
        if (!err) {
            console.log('Subscribed to flights/requests'); // Subscribe to the topic flights/requests
        }
    });
    client.subscribe('flights/validation', (err) => {
        if (!err) {
            console.log('Subscribed to flights/validation'); // Subscribe to the topic flights/validation
        }
    });
});

client.on('message', (topic, message) => {
    if (topic === 'flights/info') {
        message = message.toString();
        fs.appendFile('log.txt', message + '\n', (err) => {
            if (err) {
                console.error('Error appending buffer to log.txt:', err);
            }
        });
        message = JSON.parse(message);
        message.forEach(obj => {
            obj.flights = JSON.parse(obj.flights);
            obj.carbonEmission = JSON.parse(obj.carbonEmission);
        });
        console.log('Received message from topic:', topic);
        console.log('Message:', message);
        axios.post(post_flight_url, message)
            .then(response => {
                console.log('Response:', response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    } else if (topic === 'flights/requests') {
        message = message.toString();
        fs.appendFile('log.txt', message + '\n', (err) => {
            if (err) {
                console.error('Error appending buffer to log.txt:', err);
            }
        });
        message = JSON.parse(message);
        console.log('Received message from topic:', topic);
        console.log('Message:', message);
        // TODO: Send message to API

    } else if (topic === 'flights/validation') {
        message = message.toString();
        fs.appendFile('log.txt', message + '\n', (err) => {
            if (err) {
                console.error('Error appending buffer to log.txt:', err);
            }
        });
        message = JSON.parse(message);
        console.log('Received message from topic:', topic);
        console.log('Message:', message);
        // TODO: Send message to API
    }
});

client.on('error', function (error) {
    console.error('MQTT Error:', error);
});




client.on('close', function () {
    console.log('Disconnected from MQTT broker');
});
