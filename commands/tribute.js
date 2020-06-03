const { parseMentions, getMemberPronounSubject, getMemberPronounPossessive, getMemberPronounObject, getMemberGenderRole } = require('../message-utils.js');
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
        const authorGenderRole = getMemberGenderRole(message.member);

        const mentionName = firstMention.displayName;
        const mentionSub = getMemberPronounSubject(firstMention);
        const mentionPos = getMemberPronounPossessive(firstMention);
        const mentionObj = getMemberPronounObject(firstMention);
        const mentionGenderRole = getMemberGenderRole(firstMention);

        // Stash our custom text, if we need it later.
        let tempArgs = args.slice();
        tempArgs.splice(0, 2);

        //Make sure there was a user tagged
        if(!firstMention){
            return message.channel.send(`The correct syntax of the command is "$tribute <@user> [cum-location]". cum-location is optional.`);
        }

        if(author.id == firstMention.user.id){
            return message.channel.send(`What kind of sick narcissist cum tributes ${authorObj}self?!?`);
        }

        // Tags we want applied to every query.
        let globalTags = [ 
            '-animated*', 
            '-webm', 
            '-comic', 
            '-monochrome', 
            '-bestiality', 
            '-orc',
        ];

        // Counts of the participant genders.
        let maleCount = 0;
        let femaleCount = 0;
        let futaCount = 0;

        if(authorGenderRole.name === 'male') maleCount++;
        if(mentionGenderRole.name === 'male') maleCount++;

        if(authorGenderRole.name === 'female') femaleCount++;
        if(mentionGenderRole.name === 'female') femaleCount++;

        if(authorGenderRole.name === 'futa') futaCount++;
        if(mentionGenderRole.name === 'futa') futaCount++;

        // Build the gendered tags based on our participant counts.
        if(maleCount === 1) globalTags.push('1boy');
        else if(maleCount > 1) globalTags.push(`${maleCount}boys`);

        if(femaleCount + futaCount === 1) globalTags.push('1girl');
        else if(femaleCount + futaCount > 1) globalTags.push(`${femaleCount + futaCount}girls`);

        if(futaCount > 0 && maleCount > 0) globalTags.push('futa_with_male');
        if(futaCount > 0 && femaleCount > 0) globalTags.push('futa_with_female');
        if(futaCount > 1 && femaleCount === 0 && maleCount === 0) globalTags.push('futa_with_futa');

        // Define the locations and texts.
        const tributeOptions = {
            'face': {
                'is_valid': () => { return true },
                'tags': ['cum_on_face', '-vaginal', '-anal'],
                'global_tag_excludes': [ ],
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

                    `A large cock looming over ${mentionName}'s face, ${mentionPos} mouth working at the balls as`
                    + ` ${authorName} jerks ${authorPos} cock with both hands, ${mentionName}'s hands digging into`
                    + ` ${authorPos} legs with anticipation. A few moments and large streams of thick seed spray all`
                    + ` over ${mentionPos} face as ${mentionSub} hears ${authorName} moan out in ecstasy.`,
                ],
            },
            'eyes': { 'redirect': 'face' },
            'lips': { 'redirect': 'face' },
            'hair': { 'redirect': 'face' },
            'cheek': { 'redirect': 'face' },
            'forehead': { 'redirect': 'face' },

            'mouth': {
                'is_valid': () => { return true },
                'tags': ['cum_in_mouth', '-vaginal', '-anal'],
                'global_tag_excludes': [ ],
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

                    `As ${authorName} grabs on to the back of ${mentionName}'s head, ${mentionSub} can feel the strong`
                    + ` scent hit ${mentionPos} nose, the cock pushing deep inside ${mentionPos} throat as ${mentionSub}`
                    + ` teases at the balls with cum drunk hands. With a grunt and a slow pullout, ${authorName} cums`
                    + ` down ${mentionName}'s throat and all over ${mentionPos} tongue, leaving the delicious taste`
                    + ` lingering in ${mentionPos} mouth.`,

                    `${mentionName}'s eyes bulged open wide, ${authorName}'s fat cock in ${mentionPos} mouth pulsing and`
                    + ` throbbing uncontrollably. ${mentionName} could feel all that hot, thick semen hitting the`
                    + ` back of ${mentionPos} throat, completely painting ${mentionObj} inside, more and more cum`
                    + ` gushing down ${mentionPos} throat as if ${authorName} was trying to impregnate ${mentionName}'s`
                    + ` stomach. ${authorName} finally pulled out, scraping ${authorPos} cock across ${mentionName}'s`
                    + ` tongue, the flavour of ${authorPos} spent seed mixing with ${mentionPos} throat slime,`
                    + ` ${mentionName}'s eyes rolled back as ${mentionSub} drooled semen out helplessly, skullfucked`
                    + ` completely dumb.`,

                    `${authorName} grabbed ${mentionName}'s head by ${mentionPos} hair, using ${mentionPos} mouth to jerk`
                    + ` ${authorPos} cock off like ${mentionName} was just an onahole to ${authorObj}, ${authorPos}`
                    + ` balls slapping against ${mentionPos} chin as ${mentionSub} was roughly used, ${mentionPos}`
                    + ` throat nothing but friction for ${authorName}'s thick, throbbing cock. ${mentionName} felt`
                    + ` ${authorName}'s grip tighten, forcing ${mentionObj} to look up at ${authorObj} as the fat dick`
                    + ` violating ${mentionPos} throat pulsed and throbbed violently, a hot stream of semen rushing out`
                    + ` into ${mentionName}'s throat hole as ${authorName} used ${mentionObj} as a human condom, emptying ${authorPos}`
                    + ` balls right into ${mentionPos} throat hole, before pulling out and wiping ${authorPos} cock clean on`
                    + ` ${mentionPos} slutty face.`,
                ],
            },
            'tongue': { 'redirect': 'mouth' },
            'throat': { 'redirect': 'mouth' },
            'stomach': { 'redirect': 'mouth' },

            'breasts': {
                'is_valid': () => { return femaleCount + futaCount > 0 },
                'tags': ['cum_on_breasts', '-vaginal', '-anal'],
                'global_tag_excludes': [ ],
                'messages': [
                    `${authorName} aims ${authorPos} cock at ${mentionName}'s exposed tits, jerking`
                    + ` the rigid shaft eagerly as ${authorPos} climax builds. A thick spray of pent-up cum glazes`
                    + ` ${mentionName}'s chest as ${authorName} keeps pumping, a large load`
                    + ` soon dripping down ${mentionPos} body.`,

                    `Pushing ${authorName} on to a chair, enveloping the giant cock in front of ${mentionObj} with`
                    + ` ${mentionPos} breasts, ${mentionName} starts to jerk it with a methodical rythm, drawing out`
                    + ` ${authorPos} moans. As ${authorSub} nears release, ${mentionSub} pumps faster, the ropes of cum`
                    + ` flying up at first, only to be swallowed by the embrace of the soft tits that brought ${authorObj}`
                    + ` to the edge.`,
                ],
            },
            'tits': { 'redirect': 'breasts' },
            'breast': { 'redirect': 'breasts' },
            'tit': { 'redirect': 'breasts' },

            'pussy': {
                'is_valid': () => { return femaleCount + futaCount > 0 },
                'tags': ['cum_in_pussy', '-anal'],
                'global_tag_excludes': [ ],
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

                    `With a welcoming smile and legs pushed back, ${mentionName} watches as ${authorName} enters ${mentionPos}`
                    + ` needy cunt, the wetness making it easily hit the walls of ${mentionPos} womb as ${authorName} pumps`
                    + ` inside ${mentionObj} with reckless abbandon. With a mutual grunt and nails digging into soft flesh,`
                    + ` ${authorSub} cums deep inside ${mentionPos} waiting womb, impregnating ${mentionName} with a steady`
                    + ` stream of heavy seed.`
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
                'is_valid': () => { return true },
                'tags': ['cum_in_ass', '-vaginal'],
                'global_tag_excludes': [ ],
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

                    `On all fours with hands gripping the sides of ${mentionPos} welcoming ass, ${mentionName}`
                    + ` moans loudly as ${authorName}'s thick and meaty cock pushes inside, rearranging`
                    + ` ${mentionPos} guts. As the mix of pain and pleasure pushes ${mentionName} into cumming`
                    + ` hard, ${authorName} tenses and grunts around the tight ass that slowly milks the load`
                    + ` inside ${authorPos} balls.`,
                ],
            },
            'asshole': { 'redirect': 'ass' },

            'ear': {
                'is_valid': () => { return true },
                'tags': ['ear_insertion', '-tentacles', '-slugs'],
                'global_tag_excludes': [ ],
                'messages': [
                    `${authorName} grabs ${mentionName}'s head in both hands, covering ${mentionPos}`
                    + ` face with ${authorPos} palm as ${authorSub} roughly rubs ${authorPos}`
                    + ` hard cock against ${mentionName}'s defenseless ear. Eventually, ${authorSub} pulls`
                    + ` ${authorPos} hips back enough to press the head of ${authorPos} leaking cock into the`
                    + ` exposed ear and unloads waves of hot, sticky cum, trying to soak ${mentionName}'s brain in it directly.`,
                ],
            },
                    
            'feet': {
                'is_valid': () => { return true },
                'tags': ['cum_on_feet', 'toes', '-vaginal', '-anal'],
                'global_tag_excludes': [ ],
                'messages': [
                    `${authorName} holds ${mentionName}'s feet in both hands, sliding ${authorPos} dick between them.`
                    + ` ${mentionName} giggles as ${authorName} begins thrusting ${authorPos} dick back and forth bewteen`
                    + ` the soles of ${mentionPos} feet. ${authorName} groans and spews hot cum all over ${mentionName}'s feet and ankles.`,
                ],
            },
            'foot': { 'redirect': 'feet' },
            'toes': { 'redirect': 'feet' },
            
            'boipussy': {
                'is_valid': () => { return maleCount + futaCount === 2 },
                'tags': ['cum_in_ass', 'trap', '-vaginal', '2boys'],
                'global_tag_excludes': ['1girl', '1boy'],
                'messages': [
                    `${mentionName} spreads ${mentionPos} smooth ass, showing it off for ${authorName}.` 
                    + `${authorName} grabs ${mentionName} roughly, poking the tip of ${authorPos} cock into`
                    + `${mentionPos} tight asshole. ${mentionName} moans loudly, and ${mentionPos} dick drips with precum.` 
                    + `${authorName}'s cock fills ${mentionName}'s ass with cum, the hot liquid overflowing and pooling at their feet.`
                ],
            },
            'boypussy': { 'redirect': 'boipussy' },
            'girlcock': { 'redirect': 'boipussy' },
                    
            'custom': {
                'is_valid': () => { return false },
                'tags': ['cum'],
                'global_tag_excludes': [ ],
                'messages': [
                    tempArgs.join(' '),
                ],
            },
        };

        let option = resolveLocation(args[1], tributeOptions);

        const site = new Gelbooru(message);
        const siteSearch = site.search([...option.tags, ...globalTags.filter(f => !option.global_tag_excludes.includes(f))]);

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
        option = [...Object.entries(options).filter((f) => { return 'is_valid' in f[1] && f[1]['is_valid']() })].random()[1];
    }

    while(option.redirect) {
        option = options[option.redirect];
    }

    return option;
}
