let Scheduler = require('./prayerTimeSchedule');
const moment = require('moment-timezone')
var admin = require('firebase-admin');
let config = require('./botConfig.json');
var firebaseServiceAccount = require('./serviceAccountKey.json');
const PrayerTimeFireStore = require('./prayerTimeFireStore');
admin.initializeApp({
    credential: admin.credential.cert(firebaseServiceAccount),
    databaseURL: config.firestoreDB
});

const db = admin.firestore();

let pt_fs = new PrayerTimeFireStore(db);

// let scdl = new Scheduler(null, db);

// scdl.getCitiesAndSchedule();
pt_fs.getACityUsers('Algeria','Blida').then(function (snapshot) {
    snapshot.forEach(userDoc => {
        let d = userDoc.data();
        console.log('doc ===== doc id = ' + userDoc.id);
        console.log("user = " + d.username);
        console.dir(d);
    });
}).catch(function (err){
    console.error(err);
});

// let subUsersColl = db.collection('cities').doc('Algeria_Blida').collection('users');

// console.log('sub user collec');
// console.dir(subUsersColl);

// subUsersColl.get().then(function (snapshot) {
//     console.log("snapshot = ");
//     console.dir(snapshot);

//     snapshot.forEach(doc => {
//         console.log("doc hello !!!!");
//         console.dir(doc.data());
//     })
// }).catch(function (err) {
//     console.error(err);
// })
// testing moment 

// let d = moment.tz('2018-06-19T15:00:00','Asia/Dubai'); // this to set a time in the time zone // let d = moment('2018-06-19T15:00:00').tz('Asia/Dubai');   -- this is different, it set the time in local time then we set in what time zone we want to format in !!!! so attention
// let l = moment('2018-06-19T15:00:00');
// let dd = d.toDate();
// let ld = l.toDate();

// console.log(d.format());
// console.log(l.format());

// if(l < d) {
//     console.log('l < d');
// } else if(l - d === 0 ) {
//     console.log('l = d');
// } else {
//     console.log('l > d');
// }
// let ref = db.collection('users').doc('328601205259632640');
// ref.get().then(function (doc) {
//     console.log(doc.id);
//     if(!doc.exists) {
//         console.log('no such doc');
//     } else {
//         console.log('doc data: ', doc.data());
//     }
// });

// let  refC = db.collection('cities').doc('Algeria_Blida').collection('users');
// refC.get().then(function (snapshot) {
//   snapshot.forEach(doc => {
//       console.log(doc.id);
//   })
// });

// let ref2 = db.collection('cities');
// ref2.get().then(function (snapshot) {
//     // console.log('snapshot ) ');
//     // console.dir(snapshot);
//     snapshot.forEach(doc => {
//         console.log(doc.id);
//     })
// });

// db.collection('cities').doc('test').collection('users').doc('test').set({test: 'test'}).then(function () {
//     console.log('successs !!!!!');
// });