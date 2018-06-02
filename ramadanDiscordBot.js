const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => ***REMOVED***
  console.log(`Logged in as $***REMOVED***client.user.tag}!`);
});
const prefix = '!';
client.on('message', msg => ***REMOVED***
    const args = message.content.slice(prefix.length)
});

client.login('token');