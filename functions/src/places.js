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

exports.addFavorite = (req, res) =>{
  
  let newFavorite = {
    name: req.body.name,
    image: req.body.image,
    location: req.body.location,
    hours: req.body.hours
  };

  const db = connectDb();
  db.collection("favorites")
    .add(newFavorite)
    .then((docRef) => res.status(201).send({ id: docRef.id }))
    .catch((err) => res.status(201).send(err));
}

exports.getFavorites = (req, res) =>{
  const db = connectDb();
  db.collection("favorites")
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
}