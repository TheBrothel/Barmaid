const { parseMentions } = require('../message-utils.js');
const { DB } = require('../db.js');
const Discord = require('discord.js');

module.exports = {
    name: 'pat',
    aliases: ['headpat', 'pet'],
    description: 'Imoutos are for protecting and headpatting.',
    execute(message, args){
        
        //Get stuff to work with
        const author = message.author;
        const authorName = messsage.member.displayName;
        const mentions = parseMentions(message);
        const firstMention = mentions[0];
        const mentionName = firstMention.displayName;
        

        //Check to make sure this is a valid command
        if(args.length < 1 || args.length > 1){
            console.log('The correct syntax of this command is "$pat @user", aliases $headpat and $pet also work.');
        }
        else{
            let embed = new Discord.MessageEmbed()
                .setDescription(`${authorName} gingerly pats ${mentionName} on the head.`);
            message.channel.send(embed);
        }
    }
}