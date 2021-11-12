const functions = require("firebase-functions");
const express = require('express')
const cors = require('cors');
const { getEvents, createEvent, updateEvent, deleteEvent, getEventById } = require("./src/events");
const app = express()
app.use = (cors())

app.get('/events', getEvents)
app.get('/events/:eventId', getEventById)
app.post('/events', createEvent)
app.patch('/events/:eventId', updateEvent)
app.delete('/events', deleteEvent)

// app.get('/places', getPlaces)
// app.get('/places/:placeId', getPlaceById)
// app.post('/places', createPlace)
// app.patch('/places/:placesId', updatePlace)
// app.delete('/places/:placeId', deleteEvent)



exports.app = functions.https.onRequest(app)