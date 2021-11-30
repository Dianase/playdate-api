const functions = require("firebase-functions");
const admin = require('firebase-admin')
const creds = require('./credentials.json')
const express = require('express')
const cors = require('cors');
const { getEvents, createEvent, updateEvent, deleteEvent, getEventById, getActivities, joinEvent } = require("./src/events");
const { getUsers, createUser} = require("./src/users");
const { getPlaces, addFavorite, getFavorites } = require("./src/places")
const app = express()
app.use(cors())

admin.initializeApp({
  credential: admin.credential.cert(creds)
})
// create a firebase admin jwt middleware
const withAuthorization = async (req,res,next) => {
  const jwt = req.headers.authorization.replace("Bearer ", "")
  // console.log(jwt)
  try {
    const id = await admin.auth().verifyIdToken(jwt);
    res.locals.userId = id.uid;
  } catch(ex) {
    console.error(ex)
    res.status(403).send('Unauthorized');
    return;
  }
  next();
};

app.get('/events', getEvents)
app.get('/events/:eventId', getEventById)

//behind jwt verification
app.post('/events', withAuthorization, createEvent)
app.patch('/events/:eventId', withAuthorization, updateEvent)
app.delete('/events', withAuthorization, deleteEvent)

app.get('/myactivities', getActivities)
app.post('/myactivities', withAuthorization, joinEvent)

//add join event route
// app.post('events/eventId', joinEvent)

app.get('/Places', getPlaces)
app.get('/favorites', getFavorites)
app.post('/favorites', withAuthorization, addFavorite)

app.get('/users', getUsers)
// app.get('/users/:userId', getUserById)
app.post('/users', createUser)
// app.patch('/users/:userId', updateUser)
// app.delete('/users/:userId', deleteUser)



exports.app = functions.https.onRequest(app)