/**
 * registration updated (only one city at once, registring again, will remove you from the old city)
 * 
 * 
 * Observations:
 * NOTE:
 * possible issues:
 * => if someone register and register again before the first one completly end! You may handle that. a global object, that lock registration for a person (by id) ==> to be done!!
 */

const Discord = require('discord.js');
var admin = require('firebase-admin');
const PrayerTimeFireStore = require('./prayerTimeFireStore');
const PrayerTimeScheduler = require('./prayerTimeSchedule');
const moment = require('moment-timezone');
const fs = require('fs');

let config;
if(process.env.BOT_CONFIG) {
    console.log("get it from Env var !!!!!!!!!!");
    config = JSON.parse(process.env.BOT_CONFIG);
} else {
    console.log("get from file !!!!!!!");
    config = require('./botConfig.json');
}

// setting firestore
var firebaseServiceAccount;
if(process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    firebaseServiceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
} else {
    firebaseServiceAccount = require('./serviceAccountKey.json');
}

admin.initializeApp({
    credential: admin.credential.cert(firebaseServiceAccount),
    databaseURL: config.firestoreDB
});
const db = admin.firestore();
let pt_fb = new PrayerTimeFireStore(db);


let remindersDistances = [{
    distance: 10,
    unit: 'm'
},
{
    distance: 5,
    unit: 'm'
}
];
//setting discord client for the bot
const client = new Discord.Client();
let prayerTimeScheduler = null;
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    if (prayerTimeScheduler === null) {
        prayerTimeScheduler = new PrayerTimeScheduler(null, db, client);

        prayerTimeScheduler.getCitiesAndSchedule(remindersDistances);
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
        let args = parseArgsWithQuot(msg.content.slice(config.prefix.length).trim());
        let command = args.shift().toLowerCase();

        switch (command) {
            case 'prayer':
                switch (args[0].toLowerCase()) {
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

                        country = capitalizeFirstLetter(country).trim();
                        city = capitalizeFirstLetter(city).trim();

                        // registring the user
                        console.log("registring user  = '" + msg.author.id);
                        msg.channel.send(`Hang on! registration launched and caried by the best samurai's`);
                        pt_fb.registerUserToDB(msg, country, city)
                        .then(function (v) {
                            //in registration success

                            let sendMsg =
                                `Registration successful!
                            your Entries:
                                Country: ${country}
                                City: ${city}
                        `
                            msg.channel.send(sendMsg);
                            console.log(sendMsg);

                            // after registering a new user we need to check if it's city is a new city or already existing one, in the first case we will launch a schedule for the new city.

                            // console.log("v.city");
                            // console.dir(v.city);

                            // console.log("v : ");
                            // console.dir(v);

                            let cityExists = v.city.cityExists;
                            if(prayerTimeScheduler && !cityExists) {
                                prayerTimeScheduler.newCityScheduling(country, city, remindersDistances);
                            }

                        }).catch(function (err) {
                            // in registration failure
                            console.error("Error adding document: ", err);

                            msg.channel.send('OPSS! Registration failed when trying to connect to database, please try again!')
                        });
                        // pt_fb.createCityAndAddUser(country, city, msg.author.id).then(function (v) {
                        //     console.log("result");
                        //     console.dir(v);
                        // }).catch(function (err) {
                        //     console.log("err !!!!!!!");
                        //     console.error(err);
                        // });
                    case 'unsubscrib':
                        pt_fb.unsubscribUser(msg)
                        .then(function () {
                            msg.channel.send(`${msg.author.username} unsubscrib was succesfull !  
                            \n
                            (know that you can resubscrib, to your last registration city, with \`\`\`!prayer resubscrib\`\`\`)`);
                        })
                        .catch(function () {
                            msg.channel.send(`Unsubscrib failed!!!  try again!`);
                        });
                        break;
                    case 'resubscrib':
                        pt_fb.resubscrib(msg)
                        .then(function () {
                            msg.channel.send(`${msg.author.username} resubscribtion was successful!\nFrom now on, you will get your beloved reminders!`);
                        })
                        .catch(function () {
                            msg.channel.send('resubscribtion failed! try again!');
                        });

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

/**
 * note well normally i should have used yargs library or something similair to win time, and have a better args parsing, easy, more features riche. and out of the box. 
 * 
 * but for fun! and just like that, i build up a quick parsing function (that take in the double quote arguments)
 */

let spaceLetters = [' ', '\t'];

function isAWhiteSpace(letter) {
    for(let i = 0; i < spaceLetters.length; i++){
        if(spaceLetters[i] === letter) {
            return true
        }
    }
    return false;
}

function parseArgsWithQuot(commandMsg) {
    commandMsg = commandMsg.trim();
    let args = [];
    let quoteArg = false;
    let start = false;
    debugger;
    for (let i = 0; i < commandMsg.length; i++) {
        let l = args.length - 1;
        debugger;
        if (!start && (commandMsg[i] === '"')) {
            quoteArg = true;
            start = true;
            args.push('');
            debugger;
        } else if (!start && commandMsg[i] !== '"' && !isAWhiteSpace(commandMsg[i])) {
            quoteArg = false;
            start = true;
            args.push('');
            args[l + 1] += commandMsg[i];
            debugger;
        } else if (start && quoteArg && commandMsg[i] !== '"') {
            args[l] += commandMsg[i];
            debugger;
        } else if (start && !quoteArg && !isAWhiteSpace(commandMsg[i])) {
            args[l] += commandMsg[i];
            debugger;
        } else if (start && quoteArg && commandMsg[i] === '"') { // here finishing and getting the args
            start = false;
            debugger;
        } else if(start && !quoteArg && (isAWhiteSpace(commandMsg[i]) || i === commandMsg.length - 1)) {
            start = false;
            debugger;
        }
    }
    return args;
}




// just for reference

// let args = msg.content.slice(config.prefix.length);
//         let command = args.shift().toLowerCase();

//         if(command === 'prayer') {
//             [register, Country, city] = args;

//             // here go what to do (and check to for the one that wasn't provided (undefined))
//         }
//     }