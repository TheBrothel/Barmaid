const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const { DB } = require('./db.js');

require('./message-utils.js');
require('./array-utils.js');
require('./string-utils.js');

const blacklistedUsers = [
];

const client = new Discord.Client();
client.commands = new Discord.Collection();

// Load all command files.
const commandFiles = fs.readdirSync('./commands')
    .filter(file => file.endsWith('.js'));

// Add the commands to our client.
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    // Set a new item in the Collection with the 
    // key as the command name and the value as the exported module.
    client.commands.set(command.name, command);
}


client.once('ready', () => {
    DB.connect();

    // Let us know you're alive in the console.
	console.log('Ready!');
});

client.on('message', message => {
    // Only process the message if it starts with our prefix
    // or it's from a bot.
    if (!message.content.startsWith(prefix) 
        || message.author.bot
        || blacklistedUsers.includes(message.author.id)) 
        return;

    // Grab the argument list.
    const args = message.content.slice(prefix.length).split(/ +/);
    
    // Grab the normalized command name.
    const command = args.shift().toLowerCase();
    
    const commandObject = client.commands.get(command)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    // Ignore requests for commands that don't exist.
    if (!commandObject)  return;

    // Run our matched command.
	try {
		commandObject.execute(message, args, client);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});



client.login(process.env.BOT_TOKEN || token);