const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const { DB } = require('./db.js');

require('./message-utils.js');
require('./array-utils.js');

const blacklistedUsers = [
    '484569795426123776',
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
        || blacklistedUsers.contains(message.author.id)) 
        return;

    // Grab the argument list.
    const args = message.content.slice(prefix.length).split(/ +/);
    
    // Grab the normalized command name.
	const command = args.shift().toLowerCase();

    // Ignore requests for commands that don't exist.
    if (!client.commands.has(command)) 
        return;

    // Run our matched command.
	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});



client.login(process.env.BOT_TOKEN || token);