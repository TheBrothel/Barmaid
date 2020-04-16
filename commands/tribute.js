const { parseMentions } = require('../message-utils.js');
const { DB } = require('../db.js');
const { Gelbooru } = require('../image-board.js');
const Discord = require('discord.js');

module.exports = {
    name: 'tribute',
    aliases: [
        'cum',
        'cumon',
        'cum_on',
        'cumin',
        'cum_in',
    ],
    description: 'Nut!',
    execute(message, args){
        //Get the stuff we need to work with
        const author = message.author;
        const mentions = parseMentions(message);
        const firstMention = mentions[0];

        //Make sure there was a user tagged
        if(!firstMention || args.length > 2){
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
                    `${author.username} grabs ${firstMention.username}'s hair and pulls their head back to watch`
                    + ` as ${author.username} uses their other hand to stroke their rigid cock right over`
                    + ` ${firstMention.username}'s face. \n\n`
                    + ` Before long, ${author.username}'s cock leaks precum onto ${firstMention.username}'s face`
                    + ` as ${author.username} tenses. They pull back on ${firstMention.username}'s hair more and`
                    + ` unloads thick ropes of cum across their face with a satisfied groan.`,

                    `With a relieved groan, ${author.username} gives their needy cock a few more furious pumps`
                    + ` before firing a sticky shot of cum across the ${firstMention.username}'s face from hair to chin,`
                    + ` letting the next few pumps fly carelessly into ${firstMention.username}'s mouth and cheeks.`,
                ],
            },
            'eyes': { 'redirect': 'face' },
            'lips': { 'redirect': 'face' },
            'hair': { 'redirect': 'face' },
            'cheek': { 'redirect': 'face' },
            'forehead': { 'redirect': 'face' },

            'mouth': {
                'tags': ['cum_in_mouth', '-vaginal', '-anal'],
                'messages': [
                    `${author.username} drags ${firstMention.username}'s lips over the head of their`
                    + ` cock by ${firstMention.username}'s hair, jerking off eagerly with their other hand.`
                    + ` Soon enough, ${author.username}'s balls tighten and they empty their balls straight into`
                    + ` ${firstMention.username}'s sucking mouth, filling the warm hole with delicious cum.`,
                ],
            },
            'tongue': { 'redirect': 'mouth' },
            'throat': { 'redirect': 'mouth' },
            'stomach': { 'redirect': 'mouth' },

            'breasts': {
                'tags': ['cum_on_breasts', '-vaginal', '-anal'],
                'messages': [
                    `${author.username} aims their cock at ${firstMention.username}'s exposed tits, jerking`
                    + ` the rigid shaft eagerly as their climax builds. A thick spray of pent-up cum glazes`
                    + ` ${firstMention.username}'s chest as ${author.username} keeps pumping, a large load`
                    + ` soon dripping down ${firstMention.username}'s body.`,
                ],
            },
            'tits': { 'redirect': 'breasts' },
            'breast': { 'redirect': 'breasts' },
            'tit': { 'redirect': 'breasts' },

            'pussy': {
                'tags': ['cum_in_pussy', '-anal'],
                'messages': [
                    `${author.username} holds ${firstMention.username} by the hips tightly as they`
                    + ` thrust with desperate need. Within moments, ${author.username} bottoms out in`
                    + ` ${firstMention.username}'s pussy roughly before arching their back and emptying`
                    + ` hot ropes of cum deep inside her, excess semen quickly leaking`
                    + ` out around where the two are connected.`,

                    `${author.username} bends ${firstMention.username} over against the wall, kicking her feet`
                    + ` further apart and teasing the head of their rigid cock up and down her pussy lips. With`
                    + ` an unceremonious thrust forward, ${author.username} stretches ${firstMention.username} over`
                    + ` themself like a sleeve and starts using her cunt to milk their cock. Before long, ${author.username}`
                    + ` drives into her hard enough to stumble her forward as they relieve their heavy balls, splashing`
                    + ` thick cum deep inside her.`,
                ],
            },
            'cunt': { 'redirect': 'pussy' },
            'vagina': { 'redirect': 'pussy' },
            'hole': { 'redirect': 'pussy' },
            'cumhole': { 'redirect': 'pussy' },
            'fuckhole': { 'redirect': 'pussy' },
            'cockhole': { 'redirect': 'pussy' },
            'cocksocket': { 'redirect': 'pussy' },
            'cocksleeve': { 'redirect': 'pussy' },

            'ass': {
                'tags': ['cum_in_ass', '-vaginal'],
                'messages': [
                    `${author.username} pulls back on ${firstMention.username}'s hips roughly as they fuck,`
                    + ` ${firstMention.username}'s ass stretched pleasurable over ${author.username}'s needy cock.`
                    + ` ${author.username} lets out a deep groan as they start pouring their hot load into the tight`
                    + ` hole, not stopping their hips until ${firstMention.username}'s ass is leaking fresh cum down`
                    + ` their thighs.`,

                    `As ${author.username} pounds away at ${firstMention.username}'s ass with loud smacks of their skin,`
                    + ` ${author.username} suddenly tenses up and drives their cock down into the abused fuckhole with their`
                    + ` weight. Thick sprays of cum paint the inside of ${firstMention.username}'s body as ${author.username}'s`
                    + ` cock pulses with relief.`,
                ],
            },
            'asshole': { 'redirect': 'ass' },

            'ear': {
                'tags': ['ear_insertion', '-tentacles', '-slugs'],
                'messages': [
                    `${author.username} grabs ${firstMention.username}'s head in both hands, covering ${firstMention.username}'s`
                    + ` face with their palm as they roughly rub their hard cock against ${firstMention.username}'s defenseless ear.`
                    + ` Eventually, ${author.username} pulls their hips back enough to press the head of their leaking cock into the`
                    + ` exposed ear and unloads waves of hot, sticky cum, trying to soak ${firstMention.username}'s brain in it directly.`,
                ],
            },
        };

        const option = resolveLocation(args[1], tributeOptions);

        const site = new Gelbooru(message);
        const siteSearch = site.search([...option.tags, ...globalTags]);

        incrementCount(author, firstMention,
            () => { reply(message, author, firstMention, option, siteSearch, site); });        
    },
};

//Talk to the server and update the stats
function incrementCount(author, firstMention, callback) {
    DB.query(`INSERT INTO cum_tribute_data (user_id, target_id, times) \
    VALUES ('${author.id}', '${firstMention.id}', 1) ON DUPLICATE KEY UPDATE times = times + 1`,
    callback);
}

function reply(rows, fields, message, author, firstMention, option, siteSearch, site) {
    DB.query(`SELECT times FROM cum_tribute_data \
        WHERE user_id = '${author.id}' AND target_id = '${firstMention.id}' UNION \
        SELECT times FROM (SELECT SUM(times) as times FROM cum_tribute_data \
        WHERE target_id = '${firstMention.id}' GROUP BY target_id) a`, 
    async (rows) => {
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
}

function resolveLocation(requestedLocation, options) {
    let option = [];

    if(requestedLocation && options[requestedLocation]) {
        option = options[requestedLocation];
    }
    else {
        option = [...Object.entries(options)].random()[1];
    }

    while(option.redirect) {
        option = options[option.redirect];
    }

    return option;
}