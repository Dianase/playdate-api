const { connectDb } = require("./connection/db");

exports.getEvents = async (req, res) => {
  const db = connectDb();
  db.collection("Activities")
    .get()
    .then((collection) => {
      const events = collection.docs.map((doc) => {
        let event = doc.data();
        event.id = doc.id;
        return event;
      });
      res.status(200).send(events);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.createEvent = (req, res) => {
  //check that all required fields are present
  if (
    !req.body.name ||
    !req.body.location ||
    !req.body.date
    ) {
    res.status(401).send({ message: "Invalid Inputi-o" });
    return; //exits the function
  }

  // const date = new Date(req.body.date);
  //construct new clothing from .body
  let newEvent = {
    name: req.body.name,
    type: req.body.type,
    date: req.body.date,
    time: req.body.time,
    location: req.body.location,
    organizer: req.body.organizer,
    attendees: [string]
  };

  const db = connectDb();
  db.collection("Activities")
    .add(newEvent)
    .then((docRef) => res.status(201).send({ id: docRef.id }))
    .catch((err) => res.status(201).send(err));
};

exports.getEventById = (req, res) => {
  //connect to database
  const db = connectDb();
  //get eventId from the req.param
  //const eventId = req.params.productId
  const { eventId } = req.params;
  //get document from collection
  db.collection("Activities")
    .doc(eventId)
    .get()
    .then((doc) => {
      let event = doc.data();
      event.id = doc.id;
      res.send(event);
    })
    .catch((err) => res.status(500).send(err));
  //return document
};

exports.updateEvent = (req, res) => {
  const { eventId } = req.params;
  let newUpdates = {};
  if (req.body.type) newUpdates.type = req.body.type;
  if (req.body.name) newUpdates.name = req.body.name;
  if (req.body.date) newUpdates.date = req.body.date;
  if (req.body.location) newUpdates.location = req.body.location;
  if (req.body.organizer) newUpdates.organizer = req.body.organizer;

  const db = connectDb();
  db.collection("Activities")
    .doc(eventId)
    .update(req.body)
    .then(() => res.status(201).send({ message: "updated" }))
    .catch((err) => res.status(500).send(err));
};

exports.deleteEvent = (req, res) => {
  const { eventId } = req.params;
  const db = connectDb();
  db.collection("Activities")
    .doc(eventId)
    .delete()
    .then(() => res.status(202).send({ message: "deleted" }))
    .catch((err) => res.status(500).send(err));
};
