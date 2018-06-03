const Discord = require('discord.js');
var admin = require('firebase-admin');
const PrayerTimeFireStore = require('./prayerTimeFireStore');
const fs = require('fs');

let config = require('./botConfig.json');

// setting firestore
var firebaseServiceAccount = require('./serviceAccountKey.json');

admin.initializeApp(***REMOVED***
    credential: admin.credential.cert(firebaseServiceAccount),
    databaseURL: config.firestoreDB
});
const db = admin.firestore();
let pt_fb = new PrayerTimeFireStore(db);


//setting discord client for the bot
const client = new Discord.Client();

client.on('ready', () => ***REMOVED***
    console.log(`Logged in as $***REMOVED***client.user.tag}!`);
});

client.on('message', msg => ***REMOVED***
    if (msg.content.substr(0, config.prefix.length) === config.prefix) ***REMOVED***
        let args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
        let command = args.shift().toLowerCase();

        switch (command) ***REMOVED***
            case 'prayer':
                switch (args[0]) ***REMOVED***
                    case 'register':
                        [country, city] = args.slice(1);

                        // work with them and check if were provided (undefined)

                        if (!country || !city) ***REMOVED***
                            let what = '';
                            if (!country && !city) ***REMOVED***
                                what = 'country and city';
                          ***REMOVED*** else if (!country) ***REMOVED***
                                what = 'country';
                          ***REMOVED*** else ***REMOVED***
                                what = 'city';
                          ***REMOVED***
                            msg.channel.send('Sorry you need to set a city and a ' + what);
                            return;
                      ***REMOVED***

                        // registring the user
                        console.log("registring user  = '" + msg.author.id);
                        msg.channel.send(`Hang on! registration launched and caried by the best samurai's`);
                        pt_fb.registerUserToDB(msg, country, city).then(function (docRef) ***REMOVED***
                            //in registration success
                            let sendMsg = 
`Registration successful!
    your Entries:
        Country: $***REMOVED***country}
        City: $***REMOVED***city}
`
                            msg.channel.send(sendMsg);
                            console.log(sendMsg);
                      ***REMOVED***).catch(function (err) ***REMOVED***
                            // in registration failure
                            console.error("Error adding document: ", error);

                            msg.channel.send('OPSS! Registration failed when writing to database, please try again!')
                      ***REMOVED***);

                    case 'unsubscrib':

                        break;
                    default:
                        //print command wrong!
              ***REMOVED***
      ***REMOVED***
  ***REMOVED***
});

client.login(config.token);














// just for reference

// let args = msg.content.slice(config.prefix.length);
//         let command = args.shift().toLowerCase();

//         if(command === 'prayer') ***REMOVED***
//             [register, Country, city] = args;

//             // here go what to do (and check to for the one that wasn't provided (undefined))
//       ***REMOVED***
//   ***REMOVED***