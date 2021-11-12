const { connectDb } = require("./db")

exports.getEvents = async (req, res) =>{
  const db = connectDb()
  db.collection('events').get()
  .then(collection => {
    const events = collection.docs.map(doc =>{
      let event = doc.data()
      event.id = doc.id
      return event
    })
    res.status(200).send(events)
  })
  .catch(err => res.status(500).send(err))
}