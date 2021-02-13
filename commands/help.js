const { parseMentions } = require('../message-utils.js');
const Discord = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ['?', 'h'],
    description: 'List of bot commands',
    async execute(message, args, client){
        
        if(args[0] == 'help'){
            return message.channel.send("There is not help entry for the 'help' command.");
        }

        let embed = new Discord.MessageEmbed();
        
        if(args[0]){
            let command = client.commands.get(args[0]) 
              || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]));

            if(command) {
              embed.setTitle(`:question: **Command:** ${command.name}`)
                .setDescription(
                  `**Description:** ${command.description || '*None*'}
                  **Aliases**: ${command.aliases ? command.aliases.join(', ') : '*None*'}
                  **Example**: ${command.examples ? command.examples.join(', ') : '*None*'}`
                );

              return message.channel.send(embed);
            }
            else{
              return message.channel.send(`There is no help entry for the '${args[0]}' command.`);
            }
        }


        embed.setTitle(`:question: **All Commands**`)
          .setDescription(
            client.commands.map(f => `${f.name}`).join('\n')
          );

        return message.channel.send(embed);
    }
}