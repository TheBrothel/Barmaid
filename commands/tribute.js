const { parseMentions, getMemberPronounSubject, getMemberPronounPossessive, getMemberPronounObject } = require('../message-utils.js');
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
        'fuck',
    ],
    description: 'Nut!',
    async execute(message, args){
        //Get the stuff we need to work with
        const author = message.author;
        const firstMention = await [...message.mentions.members][0][1].fetch();

        const authorName = message.member.displayName;
        const authorSub = getMemberPronounSubject(message.member);
        const authorPos = getMemberPronounPossessive(message.member);
        const authorObj = getMemberPronounObject(message.member);

        const mentionName = firstMention.displayName;
        const mentionSub = getMemberPronounSubject(firstMention);
        const mentionPos = getMemberPronounPossessive(firstMention);
        const mentionObj = getMemberPronounObject(firstMention);

        //Make sure there was a user tagged
        if(!firstMention || args.length > 2){
            return message.channel.send(`The correct syntax of the command is "$tribute <@user> [cum-location]". cum-location is optional.`);
        }

        if(author.id == firstMention.user.id){
            return message.channel.send(`What kind of sick narcissist cum tributes themself?!?`);
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
                    `${authorName} grabs ${mentionName}'s hair and pulls ${mentionPos} head back to watch`
                    + ` as ${authorName} uses ${authorPos} other hand to stroke ${authorPos} rigid cock right over`
                    + ` ${mentionName}'s face. \n\n`
                    + ` Before long, ${authorName}'s cock leaks precum onto ${mentionName}'s face`
                    + ` as ${authorSub} tenses. ${authorSub.uc()} pulls back on ${mentionPos} hair more and`
                    + ` unloads thick ropes of cum across ${mentionPos} face with a satisfied groan.`,

                    `With a relieved groan, ${authorName} gives ${authorPos} needy cock a few more furious pumps`
                    + ` before firing a sticky shot of cum across ${mentionName}'s face from hair to chin,`
                    + ` letting the next few pumps fly carelessly into ${mentionPos} mouth and cheeks.`,
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
                    `${authorName} drags ${mentionName}'s lips over the head of ${authorPos}`
                    + ` cock by ${mentionName}'s hair, jerking off eagerly with ${authorPos} other hand.`
                    + ` Soon enough, ${authorPos} balls tighten and ${authorSub} empties ${authorPos}`
                    + ` balls straight into ${mentionName}'s sucking mouth, filling the warm hole with delicious cum.`,

                    `${mentionName}'s eyes bulged open wide, ${authorName}'s fat cock in ${mentionPos} mouth` 
                    + ` pulsing and throbbing uncontrollably. ${mentionName} could feel all that hot, thick` 
                    + ` semen hitting the back of ${mentionPos} throat, completely painting ${mentionObj} inside, more` 
                    + ` and more cum gushing down ${mentionPos} throat as if ${authorName} was trying to impregnate` 
                    + ` ${mentionPos} stomach. ${authorName} finally pulled out, scraping ${authorPos} cock` 
                    + ` across ${mentionName}'s tongue, the flavour of ${authorPos} spent seed mixing with` 
                    + ` ${mentionName}'s throat slime, ${mentionPos} eyes rolled back as ${mentionSub} drooled` 
                    + ` semen out helplessly, skullfucked completely dumb.`,
                ],
            },
            'tongue': { 'redirect': 'mouth' },
            'throat': { 'redirect': 'mouth' },
            'stomach': { 'redirect': 'mouth' },

            'breasts': {
                'tags': ['cum_on_breasts', '-vaginal', '-anal'],
                'messages': [
                    `${authorName} aims ${authorPos} cock at ${mentionName}'s exposed tits, jerking`
                    + ` the rigid shaft eagerly as ${authorPos} climax builds. A thick spray of pent-up cum glazes`
                    + ` ${mentionName}'s chest as ${authorName} keeps pumping, a large load`
                    + ` soon dripping down ${mentionPos} body.`,
                ],
            },
            'tits': { 'redirect': 'breasts' },
            'breast': { 'redirect': 'breasts' },
            'tit': { 'redirect': 'breasts' },

            'pussy': {
                'tags': ['cum_in_pussy', '-anal'],
                'messages': [
                    `${authorName} holds ${mentionName} by ${mentionPos} hips tightly as ${authorSub}`
                    + ` thrusts with desperate need. Within moments, ${authorSub} bottoms out in`
                    + ` ${mentionName}'s pussy roughly before arching ${authorPos} back and emptying`
                    + ` hot ropes of cum deep inside ${mentionObj}, excess semen quickly leaking`
                    + ` out around where the two are connected.`,

                    `${authorName} bends ${mentionName} over against the wall, kicking ${mentionPos} feet`
                    + ` further apart and teasing the head of ${authorPos} rigid cock up and down ${mentionPos}`
                    + ` pussy lips. With an unceremonious thrust forward, ${authorName} stretches ${mentionName} over`
                    + ` ${authorObj}self like a sleeve and starts using ${mentionPos} cunt to milk ${authorPos}`
                    + ` cock. Before long, ${authorName} drives into ${mentionObj} hard enough to stumble ${mentionObj}` 
                    + ` forward as ${authorSub} relieves ${authorPos} heavy balls, splashing thick cum deep inside ${mentionObj}.`,
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
                    `${authorName} pulls back on ${mentionName}'s hips roughly as they fuck,`
                    + ` ${mentionPos} ass stretched pleasurable over ${authorPos} needy cock.`
                    + ` ${authorSub.uc()} lets out a deep groan as ${authorSub} starts pouring`
                    + ` ${authorPos} hot load into the tight`
                    + ` hole, not stopping ${authorPos} hips until ${mentionName}'s ass is leaking fresh cum down`
                    + ` ${mentionPos} thighs.`,

                    `As ${authorName} pounds away at ${mentionName}'s ass with loud smacks of their skin,`
                    + ` ${authorName} suddenly tenses up and drives ${authorPos} cock down into the abused`
                    + ` fuckhole with ${authorPos} weight. Thick sprays of cum paint the inside of`
                    + ` ${mentionName}'s body as ${authorName}'s cock pulses with relief.`,
                ],
            },
            'asshole': { 'redirect': 'ass' },

            'ear': {
                'tags': ['ear_insertion', '-tentacles', '-slugs'],
                'messages': [
                    `${authorName} grabs ${mentionName}'s head in both hands, covering ${mentionPos}`
                    + ` face with ${authorPos} palm as ${authorSub} roughly rubs ${authorPos}`
                    + ` hard cock against ${mentionName}'s defenseless ear. Eventually, ${authorSub} pulls`
                    + ` ${authorPos} hips back enough to press the head of ${authorPos} leaking cock into the`
                    + ` exposed ear and unloads waves of hot, sticky cum, trying to soak ${mentionName}'s brain in it directly.`,
                ],
            },
        };

        const option = resolveLocation(args[1], tributeOptions);

        const site = new Gelbooru(message);
        const siteSearch = site.search([...option.tags, ...globalTags]);

        incrementCount(author, firstMention,
            () => { reply(message, author, authorName, firstMention, mentionName, option, siteSearch, site); });        
    },
};

//Talk to the server and update the stats
function incrementCount(author, firstMention, callback) {
    DB.query(`INSERT INTO cum_tribute_data (user_id, target_id, times) \
    VALUES ('${author.id}', '${firstMention.user.id}', 1) ON DUPLICATE KEY UPDATE times = times + 1`,
    callback);
}

function reply(message, author, authorName, firstMention, mentionName, option, siteSearch, site) {
    DB.query(`SELECT times, 0 as trash FROM cum_tribute_data \
        WHERE user_id = '${author.id}' AND target_id = '${firstMention.user.id}' UNION \
        SELECT times, 1 as trash FROM (SELECT SUM(times) as times FROM cum_tribute_data \
        WHERE target_id = '${firstMention.user.id}' GROUP BY target_id) a`, 
    async (rows) => {
        const tributesFromThisUser = rows[0]['times'];
        const totalTributes = rows[1]['times'];

        siteSearch.then((post) => {            
            let embed = new Discord.MessageEmbed()
                .setImage(post.image_url)
                .setDescription(option.messages.random())
                .addField(`Loads from ${authorName}`, tributesFromThisUser, true)
                .addField(`Total loads for ${mentionName}`, totalTributes, true)
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