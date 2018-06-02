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

        if(command === '') ***REMOVED***
            
      ***REMOVED***
  ***REMOVED***
});

client.login('token');