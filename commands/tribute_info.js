const { parseMentions } = require('../message-utils.js');
const { DB } = require('../db.js');
const Discord = require('discord.js');

module.exports = {
    name: 'tribute_info',
    description: 'Who came on/in whom?',
    execute(message, args){
        //Get stuff we need to work with
        const mentions = parseMentions(message);
        const firstMention = mentions[0];
        const secondMention = mentions[1];
        //Check to make sure the syntax is correct.
        if(!args[0] || args.length > 2){
            return message.channel.send('The correct syntax of this command is "$tribute_info <@tributer> <@tributee>"');
        }
        if(!(secondMention == null)){
          if(firstMention.id == null){
            return message.channel.send(`One or more of the mention IDs was null, unable to execute this command`);
          }
          let embed = new Discord.MessageEmbed()
          .setTitle(':file_folder: Cumdump User to User Info');
          //Execute command
          DB.query(`SELECT times FROM cum_tribute_data WHERE user_id = '${firstMention.id}' AND target_id = '${secondMention.id}'`, 
          (rows, fields) => {
            //Notify everyone of the orgasm count!
            try{
              embed.addFields(
                {name: `Loads from ${firstMention.username} to ${secondMention.username}`, value: `${rows[0]['times']}`}
                );
            } catch (TypeError){
              embed.addFields(
                {name: `Loads from ${firstMention.username} to ${secondMention.username}`, value: `0`}
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
          DB.query(`SELECT SUM(times) AS times FROM cum_tribute_data WHERE user_id = '${firstMention.id}' UNION SELECT SUM(times) AS times FROM cum_tribute_data WHERE target_id = '${firstMention.id}'`,
          (rows) => {
            try{
              embed.addFields(
                {
                  name: `Total Loads from ${firstMention.username}`, value: `${rows[0][0]}`
                }
              );
            } catch (TypeError){
              embed.addFields(
                {
                  name: `Total Loads from ${firstMention.username}`, value: `0`
                }
              );
            }
            try{
              embed.addFields(
                {
                  name: `Total Loads to ${firstMention.username}`, value: `${rows[0][1]}`
                }
              );
            } catch (TypeError){
              embed.addFields(
                {
                  name: `Total Loads to ${firstMention.username}`, value: `0`
                }
              );
              }
              return message.channel.send(embed);
            }
          );
        }
    },
};