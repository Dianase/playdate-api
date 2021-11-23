const functions = require("firebase-functions");
const express = require('express')
const cors = require('cors');
const { getEvents, createEvent, updateEvent, deleteEvent, getEventById } = require("./src/events");
const { getUsers, createUser, 
  // updateUser, deleteUser, getUserById 
} = require("./src/users");
const app = express()
app.use(cors())

app.get('/events', getEvents)
app.get('/events/:eventId', getEventById)

// create a firebase admin jwt middleware
//should be behind jwt verification
app.post('/events', createEvent)
app.patch('/events/:eventId', updateEvent)
app.delete('/events', deleteEvent)
//add join event route


app.get('/users', getUsers)
// app.get('/users/:userId', getUserById)
app.post('/users', createUser)
// app.patch('/users/:userId', updateUser)
// app.delete('/users/:userId', deleteUser)



exports.app = functions.https.onRequest(app)