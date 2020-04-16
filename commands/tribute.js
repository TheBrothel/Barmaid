const { parseMentions } = require('../message-utils.js');
const { DB } = require('../db.js');
const { Gelbooru } = require('../image-board.js');
const Discord = require('discord.js');

module.exports = {
    name: 'tribute',
    description: 'Nut!',
    async execute(message, args){
        //Get the stuff we need to work with
        const author = message.author;
        const mentions = parseMentions(message);
        const firstMention = mentions[0];

        //Make sure there was a user tagged
        if(!firstMention || args.length >= 2){
            return message.channel.send(`The correct syntax of the command is "$tribute <@user> [cum-location]" cum-location is optional.`);
        }
        if(author.id == firstMention.id){
            return message.channel.send(`What kind of sick narcissist cum tributes themselves?!?`);
        }

        const globalTags = [ 
            '1girl', 
            '1boy', 
            '-animated*', 
            '-webm', 
            '-comic', 
            '-monochrome', 
            '-bestiality', 
            '-orc',
        ];
        
        const tributeOptions = {
            'face': {
                'tags': ['cum_on_face', '-vaginal', '-anal'],
                'messages': [
                    `${author.username} cums on ${firstMention.username}'s face`,
                ],
            },
            'breasts': {
                'tags': ['cum_on_breasts', '-vaginal', '-anal'],
                'messages': [
                    `${author.username} cums on ${firstMention.username}'s tits`,
                ],
            },
            'pussy': {
                'tags': ['cum_in_pussy'],
                'messages': [
                    `${author.username} cums in ${firstMention.username}'s pussy`,
                ],
            },
            'ass': {
                'tags': ['cum_in_ass'],
                'messages': [
                    `${author.username} cums in ${firstMention.username}'s ass`,
                ],
            },
        };

        const option = [...Object.entries(tributeOptions)].random()[1];

        const site = new Gelbooru(message);
        const siteSearch = site.search([...option.tags, ...globalTags]);

        //Talk to the server and update the stats
        DB.query(`INSERT INTO cum_tribute_data (user_id, target_id, times) \
        VALUES ('${author.id}', '${firstMention.id}', 1) ON DUPLICATE KEY UPDATE times = times + 1`);

        DB.query(`SELECT times FROM cum_tribute_data \
        WHERE user_id = '${author.id}' AND target_id = '${firstMention.id}' UNION \
        SELECT times FROM (SELECT SUM(times) as times FROM cum_tribute_data \
        WHERE target_id = '${firstMention.id}' GROUP BY target_id) a`, async (rows) => {
            const tributesFromThisUser = rows[0]['times'];
            const totalTributes = rows[1]['times'];

            siteSearch.then((post) => {            
                let embed = new Discord.MessageEmbed()
                    .setImage(post.image_url)
                    .setDescription(option.messages.random())
                    .addField(`Loads from ${author.username}`, tributesFromThisUser, true)
                    .addField(`Total loads for ${firstMention.username}`, totalTributes, true)
                    .setFooter(site.buildPostURL(post));
        
                message.channel.send(embed);
            });
        });
    },
};