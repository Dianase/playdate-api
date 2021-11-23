const { connectDb } = require("./connection/db");

exports.getUsers = async (req, res) => {
  const db = connectDb();
  db.collection("users")
    .get()
    .then((collection) => {
      const users = collection.docs.map((doc) => {
        let user = doc.data();
        user.id = doc.id;
        return user;
      });
      res.status(200).send(users);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.createUser = (req, res) => {
  //check that all required fields are present
  if ( !req.body.email || !req.body.firstName ) {
    res.status(401).send({ message: "Invalid Input" });
    return; //exits the function
  }

  //construct new clothing from .body
  let user = {
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    uid: req.body.uid
  };

  const db = connectDb();
  db.collection("users")
    .add(user)
    .then((docRef) => res.status(201).send({ id: docRef.id }))
    .catch((err) => res.status(401).send(err));
};

