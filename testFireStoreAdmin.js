var admin = require('firebase-admin');

var serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://testfirestore-edea5.firebaseio.com"
});

const db = admin.firestore();

db.collection('users').doc('Smalldjo#0352').set({
  userType: 'admin',
  userDiscordId: 'Smalldjo#0352',
  name: {
    first: 'first',
    last: 'Alien'
  }, 
  prayerTimeConfig: {
    city: 'Algiers',
    country: 'Algeria'
  }
}).then(function () {
  console.log('user added to database (new doc in )');
});

let usersCollection = db.collection('users');

usersCollection.doc('1').get().then( function (doc) {
  if(!doc.exist) {
    //here we handle when the doc is not found
    console.log("sorry the user you asked doesn't exist  (404)");
  }
  // here go work
  let data = doc.data();
  console.log('We get our user doc: ');
  console.log('userDiscordId: ' + data.userDiscordId);
  console.log('first name: ' + data.name.first);
  console.log('last name: ' + data.name.last);
  console.log('Prayer Time config : ');
  console.log('Country: ' + data.prayerTimeConfig.country);
  console.log('City: ' + data.prayerTimeConfig.city);
  
}).catch(function (err) {
  console.error('error getting document', err);
  process.exit();
})