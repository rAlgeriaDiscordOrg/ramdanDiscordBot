const Discord = require('discord.js');
var admin = require('firebase-admin');
const PrayerTimeFireStore = require('./prayerTimeFireStore');
const PrayerTimeScheduler = require('./prayerTimeSchedule');
const moment = require('moment-timezone');
const fs = require('fs');

let config = require('./botConfig.json');

// setting firestore
var firebaseServiceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(firebaseServiceAccount),
    databaseURL: config.firestoreDB
});
const db = admin.firestore();
let pt_fb = new PrayerTimeFireStore(db);



//setting discord client for the bot
const client = new Discord.Client();
let prayerTimeScheduler = null;
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    if(prayerTimeScheduler === null) {
        prayerTimeScheduler = new PrayerTimeScheduler(null, db, client);
    
        prayerTimeScheduler.getCitiesAndSchedule([
            {
                distance: 10,
                unit: 'm'
            },
            {
                distance: 5,
                unit: 'm'
            }
        ]);
    }
    // let dateFomrated = moment().format('YYYY-MM-DD');
    // let timeFormated = moment.tz(new Date(), 'Algeria/Algiers').add(10,'m').add(10, "s").format('hh:mm:ss');
    // prayerTimeScheduler.oneCitySchedule('Algeria', 'Blida', {
    //     Dhuhr: timeFormated
    // }
    // , dateFomrated, 'Algeria/Algiers');
});

client.on('message', msg => {
    if (msg.content.substr(0, config.prefix.length) === config.prefix) {
        let args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
        let command = args.shift().toLowerCase();

        switch (command) {
            case 'prayer':
                switch (args[0]) {
                    case 'register':
                        [country, city] = args.slice(1);

                        // work with them and check if were provided (undefined)

                        if (!country || !city) {
                            let what = '';
                            if (!country && !city) {
                                what = 'country and city';
                            } else if (!country) {
                                what = 'country';
                            } else {
                                what = 'city';
                            }
                            msg.channel.send('Sorry you need to set a city and a ' + what);
                            return;
                        }

                        country = capitalizeFirstLetter(country);
                        city = capitalizeFirstLetter(city);

                        // registring the user
                        console.log("registring user  = '" + msg.author.id);
                        msg.channel.send(`Hang on! registration launched and caried by the best samurai's`);
                        pt_fb.registerUserToDB(msg, country, city).then(function (v) {
                            //in registration success

                            let sendMsg =
                                `Registration successful!
                            your Entries:
                                Country: ${country}
                                City: ${city}
                        `
                            msg.channel.send(sendMsg);
                            console.log(sendMsg);
                        }).catch(function (err) {
                            // in registration failure
                            console.error("Error adding document: ", err);

                            msg.channel.send('OPSS! Registration failed when writing to database, please try again!')
                        });
                        // pt_fb.createCityAndAddUser(country, city, msg.author.id).then(function (v) {
                        //     console.log("result");
                        //     console.dir(v);
                        // }).catch(function (err) {
                        //     console.log("err !!!!!!!");
                        //     console.error(err);
                        // });
                    case 'unsubscrib':

                        break;
                    default:
                        //print command wrong!
                }
        }
    }
});

client.login(config.token);





function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}








// just for reference

// let args = msg.content.slice(config.prefix.length);
//         let command = args.shift().toLowerCase();

//         if(command === 'prayer') {
//             [register, Country, city] = args;

//             // here go what to do (and check to for the one that wasn't provided (undefined))
//         }
//     }