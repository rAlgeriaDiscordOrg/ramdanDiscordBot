const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();

let config = require('./botConfig.json');


client.on('ready', () => ***REMOVED***
  console.log(`Logged in as $***REMOVED***client.user.tag}!`);
});

client.on('message', msg => ***REMOVED***
    if(msg.content.substr(0, config.prefix.length) === config.prefix) ***REMOVED***
        let args = msg.content.slice(config.prefix.length);
        let command = args.shift().toLowerCase();

        switch(command)***REMOVED***
            case 'prayer': 
                switch (args[0])***REMOVED***
                    case 'register':
                        [country, city] = args.slice(1);
                        
                        // work with them and check if were provided (undefined)

                        if(country) ***REMOVED***

                      ***REMOVED***

                        if(city) ***REMOVED***

                      ***REMOVED***

                        break;

                    case 'unsubscrib':
                        
                        break;
                    default: 
                        //print command wrong!
              ***REMOVED***
      ***REMOVED***
  ***REMOVED***
});

client.login(config.token);