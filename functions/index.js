const functions = require("firebase-functions");
const express = require('express')
const cors = require('cors');
const { getEvents } = require("./src/events");
const app = express()
app.use = (cors())

app.get('/events', getEvents)
// app.get('/events',)
// app.post('/events',)


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.app = functions.https.onRequest(app)