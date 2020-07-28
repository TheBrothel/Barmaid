const { parseMentions } = require('../message-utils.js');
const { DB } = require('../db.js');
const Discord = require('discord.js');
const { Gelbooru } = require('../image-board.js');

module.exports = {
    name: 'pat',
    aliases: ['headpat', 'pet'],
    description: 'Imoutos are for protecting and headpatting.',
    async execute(message, args){
        
        //Get stuff to work with
        //const author = message.author;
        //const authorName = author.displayName;
        //const authorName = messsage.member.displayName;
        //const mentions = parseMentions(message);
        // const firstMention = mentions[0];
        //const mentionName = firstMention.displayName;

        const author = message.author;
        const firstMention = await [...message.mentions.members][0][1].fetch();
        const authorName = message.member.displayName;
        const mentionName = firstMention.displayName;

        const site = new Gelbooru(message, false);
        const post = await site.search(['head_pat']);

        
        //Check to make sure this is a valid command
        if(args.length < 1 || args.length > 1){
            console.log('The correct syntax of this command is "$pat @user", aliases $headpat and $pet also work.');
        }
        else{
            let embed = new Discord.MessageEmbed()
                .setDescription(`${authorName} gingerly pats ${mentionName} on the head.`)
                .setImage(post.image_url);
            message.channel.send(embed);
        }
    }
}