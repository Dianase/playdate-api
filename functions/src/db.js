const admin = require('firebase-admin')
const creds = require('../credentials.json')

exports.connectDb = () => {
  // check to see if not already connected
  if(!admin.apps.length) {
    // if not, connect to firebase admin
    admin.initializeApp({
      credential: admin.credential.cert(creds)
    })
  }
  // return firestore
  return admin.firestore()
}