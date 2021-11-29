const { connectDb } = require("./connection/db");

exports.getPlaces = async (req, res) => {
  const db = connectDb();
  db.collection("Places")
    .get()
    .then((collection) => {
      const places = collection.docs.map((doc) => {
        let place = doc.data();
        place.id = doc.id;
        return place;
      });
      res.status(200).send(places);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};