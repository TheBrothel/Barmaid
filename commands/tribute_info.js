const { parseMentions } = require('../message-utils.js');
const { DB } = require('../db.js');
const Discord = require('discord.js');

module.exports = {
    name: 'tribute_info',
    description: 'Who came on/in whom?',
    async execute(message, args){
        //Get stuff we need to work with
        const mentions = parseMentions(message);
        const firstMention = mentions[0];
        const secondMention = mentions[1];
        //Check to make sure the syntax is correct.
        if(!args[0] || args.length > 2){
            return message.channel.send('The correct syntax of this command is "$tribute_info <@tributer> <@tributee>"');
        }
        if(firstMention.id == null){
          return message.channel.send(`One or more of the mention IDs was null, unable to execute this command`);
        }
        const firstMentionUser = await message.client.users.fetch(firstMention.id);
        const firstMentionUsername = firstMentionUser.username;
        if(!(secondMention == null)){
          const secondMentionUser = await message.client.users.fetch(secondMention.id);
          const secondMentionUsername = secondMentionUser.username;
          let embed = new Discord.MessageEmbed()
          .setTitle(':file_folder: Cumdump User to User Info');
          //Execute command
          DB.query(`SELECT times FROM cum_tribute_data WHERE user_id = '${firstMentionUser}' AND target_id = '${secondMentionUser}'`, 
          (rows, fields) => {
            //Notify everyone of the orgasm count!
            try{
              embed.addFields(
                {name: `Loads from ${firstMentionUsername} to ${secondMentionUsername}`, value: `${rows[0]['times']}`}
                );
            } catch (TypeError){
              embed.addFields(
                {name: `Loads from ${firstMentionUsername} to ${secondMentionUsername}`, value: `0`}
                );
            }
            return message.channel.send(embed);
          }
        );
        }
        else {
          let embed = new Discord.MessageEmbed()
          .setTitle(`:file_folder: Cumdump Single User Info`);
          //Execute Query
          DB.query(`SELECT SUM(times) AS times FROM cum_tribute_data WHERE user_id = '${firstMentionUser}' UNION SELECT SUM(times) AS times FROM cum_tribute_data WHERE target_id = '${firstMentionUser}'`,
          (rows) => {
            embed.addFields(
              {
                name: `Total Loads from ${firstMentionUsername}`, value: `${rows && rows[0] ? rows[0].times : 0}`
                
              },
              {
                name: `Total Loads to ${firstMentionUsername}`, value: `${rows && rows[1] ? rows[1].times : 0}`
              }
            );
            return message.channel.send(embed);
            }
          );
        }
    },
};