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

        if(authorGenderRole.name === 'other'){
            switch(Math.floor(Math.random() * 3)){
                case 0:
                    maleCount++;
                    break;
                case 1:
                    femaleCount++;
                    break;
                case 2:
                    futaCount++;
                    break;
            }
        }

        if(mentionGenderRole.name === 'other'){
            switch(Math.floor(Math.random() * 3)){
                case 0:
                    maleCount++;
                    break;
                case 1:
                    femaleCount++;
                    break;
                case 2:
                    futaCount++;
                    break;
            }
        }

        // Build the gendered tags based on our participant counts.
        if(maleCount === 0) globalTags.push('-*boy*');
        else if(maleCount === 1) globalTags.push('1boy');
        else if(maleCount > 1) globalTags.push(`${maleCount}boys`);

        if(femaleCount + futaCount === 0) globalTags.push('-*girl*');
        else if(femaleCount + futaCount === 1) globalTags.push('1girl');
        else if(femaleCount + futaCount > 1) globalTags.push(`${femaleCount + futaCount}girls`);

        if(futaCount === 0) globalTags.push('-futa*');
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

                    `${mentionName} hungrily jerked ${authorName}'s cock off into ${mentionPos} own face, even as someone`
                    + ` else was railing the slut in a mating press, pounding away with animalistic lust as ${mentionSub}`
                    + ` smeared ${authorName}'s precum over ${mentionPos} hot skin. ${authorName}'s cock pulsed harder and`
                    + ` harder in ${mentionPos} hand until ${authorSub} couldn't hold back any more, suddenly painting`
                    + ` ${mentionPos} face with slut make up. It seemed that the sight of the whore suddenly getting a thick`
                    + ` facial pushed ${mentionName}'s other paramour over the edge, their cock pulsing hard inside as`
                    + ` ${mentionPos} hole got flooded, leaving the slut dripping cum from both ends.`,
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

                    `${mentionName}'s choker bulged under the force of ${authorName}'s fat cock choking ${mentionObj},`
                    + ` ${mentionPos} fuckhole stretched wide open by the thick, throbbing fuckmeat using this tight little`
                    + ` hole. ${mentionName} glubbed and gagged as ${authorName} grabbed ${mentionPos} hair, using`
                    + ` ${mentionName}'s throat to scrub along the whole length of ${authorPos} bitchbreaker, using ${mentionPos}`
                    + ` facehole as if it were just a cocksleeve, ramming harder and harder. As ${mentionName}'s choker snapped`
                    + ` from the force, ${authorName} suddenly came hard into ${mentionPos} abused throat-hole, cumming so hard`
                    + ` that ${mentionName} felt cum erupting up through ${mentionPos} nose, making a sticky mess of ${mentionPos}`
                    + ` throat, mouth, nose and whole face as ${authorName}'s left ${mentionObj} looking like a blowbang whore,`
                    + ` the remains of the choker hanging limply around ${mentionPos} neck.`,

                    `${authorName}'s hard cock couldn't wait any longer, grunting as ${authorSub} finally unloaded ${authorPos}`
                    + ` semen into ${mentionName}'s waiting mouth, ${authorPos} shaft visibly pulsing and throbbing as ${authorPos}`
                    + ` semen coated ${mentionName}'s tongue, filling ${mentionPos} mouth until some thick spurts escaped around the`
                    + ` edge. ${authorName} pulled back, leaving some thick strings of cum between ${authorPos} cock and ${mentionPos}`
                    + ` lips.`,

                    `${authorName} jerked ${authorPos} thick cock off above ${mentionName}'s open mouth, ${mentionName} patiently`
                    + ` waiting for ${mentionPos} salty reward as ${mentionSub} held ${mentionPos} mouth further open with`
                    + ` ${mentionPos} fingers. ${authorName} jerked harder and faster, groaning as ${authorSub} got closer,`
                    + ` causing ${mentionName} to stick ${mentionPos} tongue out, hungry for sperm. ${mentionName} soon got`
                    + ` ${mentionPos} wish, as ${authorName} bucked ${authorPos} hips above ${mentionName}'s face, gripping`
                    + ` ${authorPos} own cock harder as it suddenly erupted with semen, splattering it all over ${mentionPos}`
                    + ` tongue and deeper into their mouth, painting the inside of ${mentionName}'s mouth with the semen`
                    + ` ${mentionSub} so clearly needed, the dirty slut revelling in the sticky tongue-bath ${mentionSub}`
                    + ` just received.`,

                    `${mentionName} desperately jerked ${authorName}'s cock off with one hand, the tip between ${mentionPos}`
                    + ` lips, ${mentionPos} tongue lapping up the precum and teasing the sensitive head for the creamy contents`
                    + ` of ${authorPos} balls. ${mentionName}'s work was soon done as ${authorName}'s cock started jerking in`
                    + ` ${mentionPos} hand, the burning hot tip suddenly flooding ${mentionPos} mouth with ${authorName}'s thick`
                    + ` and creamy semen. ${mentionName} continued jerking until every drip was inside ${mentionPos} mouth, before`
                    + ` pulling ${authorPos} cock out to show off the load on ${mentionPos} tongue, making a big show of swallowing`
                    + ` it and then licking ${mentionPos} lips, hungry for more.`,

                    `${authorName}'s eyes opened wide as ${mentionName} licked up and down along ${authorPos} cock, already inside`
                    + ` ${mentionPos} mouth, suddenly feeling ${authorName}'s cock throbbing and pulsing, a hot, thick jet of semen`
                    + ` hitting the back of ${mentionPos} throat, ${mentionPos}  naked body shaking as ${mentionSub} gargled`
                    + ` ${authorPos} thick mayo; ${mentionName} pulled ${authorName}'s cock out of ${mentionPos} mouth, sucking any`
                    + ` remaining cum out of it before opening ${mentionObj} mouth to show off the thick, glistening load on`
                    + ` ${mentionPos} tongue, then slowly and sensuously swallowed it down, looking like ${mentionSub} were savouring`
                    + ` every~ last~ drop~.`,
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

                    `${mentionName} bounced ${mentionPos} tits up and down along ${authorName}'s cock, using them to jerk`
                    + ` ${authorName}'s cock off. ${mentionName} knelt, looking up at ${authorName} while using ${mentionPos}`
                    + ` soft, pillowy tits as an onahole on ${authorName}'s dick, watching ${authorObj} get closer and closer`
                    + ` as more precum flowed out all over those sexy tits, biting ${mentionPos} lower lip seductively as`
                    + ` ${mentionSub} did so. ${authorName} couldn't help but buck ${authorPos} hips against ${mentionPos}`
                    + ` tits as ${authorSub} got pushed over the edge, ${authorPos} cum erupting out into ${mentionName}'s`
                    + ` cleavage, completely soaking the tits that were still jerking ${authorPos} orgasming cock off,`
                    + ` flooding ${mentionPos} cleavage with hot cum, a small lake of it jiggling as ${mentionSub} bounced`
                    + ` around ${authorPos} dick.`,

                    `${mentionName} made ${authorName} lay down, sitting ${authorPos} legs on ${mentionPos} lap while`
                    + ` ${mentionName} bent over, wrapping ${mentionPos} heavy tits around ${authorPos} cock, jerking`
                    + ` off rhythmically, the throbbing cock getting inched closer and closer to orgasm every second,`
                    + ` every stroke, every rub. ${authorName} couldn't hold back for long, cumming so hard that ${authorPos}`
                    + ` semen spurted hard from ${mentionName}'s tits, soaking ${mentionObj} from ${mentionPos} tits`
                    + ` right up to ${mentionPos} hair, leaving ${mentionObj} looking like a used cum sponge. Not that`
                    + ` ${mentionSub} had any intention of complaining.`,

                    `${authorName} mounted ${mentionName}'s chest, sliding ${authorPos} thick, hard cock between`
                    + ` ${mentionPos} soft, bare tits, jerking them along the length of their own cock as ${mentionSub}`
                    + ` moaned, impatient for ${authorPos} cum. The feel of those hot, sexy slut udders wrapped around`
                    + ` ${authorObj} meant that ${mentionName} wasn't waiting long, a sudden eruption between ${mentionPos}`
                    + ` tits ending up splattering from ${mentionPos} hairline to ${mentionPos} neck, a thick, sticky coating`
                    + ` of cum all over ${mentionPos} satisfied face.`,

                    `${mentionName} wrapped ${mentionPos} tits around ${authorName}'s big cock. ${mentionName} starting to`
                    + ` jerk it between ${mentionPos} tits closer and closer to ${mentionPos} open mouth, before giving up`
                    + ` what little willpower such a cumslut has and wrapping ${mentionPos} lips around the sticky head,`
                    + ` desperately jerking ${authorPos} hard cock with ${mentionPos} tits into ${mentionPos} mouth, getting`
                    + ` more and more needy, begging and moaning around ${authorName}'s cock until feeling ${authorObj}`
                    + ` starting to pulse and throb in ${mentionPos} mouth, thick hot semen rushing out to cover ${mentionPos}`
                    + ` tongue. ${mentionName} opened ${mentionPos} mouth, letting the massive, pent up cumload drool out`
                    + ` of ${mentionPos} mouth all over ${mentionPos} own tits, glazing them completely in ${authorName}'s semen.`,

                    `${mentionName} was too desperate a cumslut to even be able to strip off right now, instead just pulling`
                    + ` ${authorName}'s cock under ${mentionPos} white t-shirt and starting to jerk ${authorObj} off with`
                    + ` ${mentionPos}  big, heavy tits, grinding the sensitive flesh up against ${authorPos} throbbing member.`
                    + ` As ${authorName} drooled precum from the tip, ${mentionName}'s white t-shirt became see-through,`
                    + ` letting ${authorObj} see ${authorPos} cock being nestled between those heavy slut udders. ${mentionName}`
                    + ` moaned, desperate for the cum ${mentionSub}'d worked so hard for, jerking harder and faster, as`
                    + ` ${authorName} was unable to hold back any longer, suddenly erupting between ${mentionPos} tits, smearing`
                    + ` ${mentionPos} body with a hot, thick load of semen ${mentionSub}'d worked ${mentionPos} tits so hard`
                    + ` to get, ${mentionPos} white t-shirt as soaked as ${mentionPos} tits. It was going to be another fun walk home~`,
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
                    + ` stream of heavy seed.`,

                    `${mentionName}'s eyes rolled back as ${authorName} pulled back on ${mentionPos} thighs, pulling`
                    + ` ${mentionObj} even harder onto ${authorPos} cock, impaled completely. ${authorName}'s cock was`
                    + ` ramming against ${mentionName}'s cervix with every thrust, bottoming out in the slut, both bodies`
                    + ` shaking and trembling with lust. ${mentionName} came so hard that ${mentionSub} almost lost`
                    + ` consciousness, ${mentionPos} already tight cunt gripping ${authorName}'s cock like a vice, pushing`
                    + ` ${authorName} over the edge too, cum spurting directly onto ${mentionName}'s cervix, a burning hot`
                    + ` jet that forced ${mentionName} to cum again, ${mentionPos} eyes rolled back and drooling as`
                    + ` ${mentionSub} were made into ${authorName}'s fucksleeve.`,

                    `${mentionName} grabbed ${authorName}'s wrists, pulling ${authorPos} throbbing cock deeper into ${mentionPos}`
                    + ` tight, wet cunt, desperately bucking ${mentionPos} hips back against ${authorName}'s body, femcum and semen`
                    + ` spraying everywhere as the slut forced ${authorName}'s cock deeper, pounding ${mentionPos} womb full of`
                    + ` hot, thick semen, ${mentionName}'s tits bouncing wildly as ${mentionSub} orgasmed hard on ${authorName}'s`
                    + ` cock, ${mentionPos} whole body shaking as ${mentionSub} felt ${authorName} breed a hot, thick load into`
                    + ` ${mentionObj}.`,

                    `${mentionName} interlaced ${mentionPos} fingers with ${authorName}'s, pulling ${authorName} down against`
                    + ` ${mentionPos} body, desperately holding ${authorName}'s hands as ${authorPos} cum pumped into ${mentionPos}`
                    + ` unprotected womb, ${mentionPos} toes curling and ${mentionPos} hips rolling against ${authorObj}, moaning`
                    + ` and panting happily as ${authorName} emptied ${authorPos} balls into ${mentionPos} fertile cunt.`,

                    `${mentionName}'s body shook hard as ${mentionSub} got railed roughly by ${authorName}'s thick, throbbing cock,`
                    + ` ${mentionPos} tits bouncing as ${authorPos} cock was forced deeper and deeper, used cum from the last time`
                    + ` the free-use cumslut's cunt was abused squirting out around ${authorName}'s dick as ${authorSub} used it as`
                    + ` lube to pound ${mentionObj} harder, faster, deeper, letting out a deep grunt and groan as ${authorSub}`
                    + ` suddenly started to unload ${authorPos} balls into the well-used cocksleeve pinned under ${authorObj},`
                    + ` ${authorPos} semen gushing out like a fountain into ${mentionPos} abused cunt, previous cumloads erupting`
                    + ` out around ${authorName}'s cock as ${authorSub} added ${authorPos} to the list and ticked another tally`
                    + ` mark off in pen on ${mentionName}'s thighs while ${mentionSub} held the back of ${mentionPos} knees for easy`
                    + ` access, both for ${authorName} and for whoever would inevitably be filling ${mentionPos} needy, fuckdrunk`
                    + ` cunt next.`,

                    `${mentionName}'s face and tits were repeatedly forced up against the wall as ${authorName}'s cock pounded into`
                    + ` ${mentionPos} tight cunt from behind, ${authorPos} hips jerking ${mentionPos} whole body forward. “That...`
                    + ` all you've... got?” teased ${mentionName}, doing ${mentionPos} best to hold onto ${mentionPos} sanity as`
                    + ` ${authorName}'s cock spread ${mentionPos} fuckhole wide open, feeling ${mentionPos} self used for friction,`
                    + ` like a pleasure doll, but needing more, wanting it rougher. Whether or not ${authorSub} knew ${authorSub}'d`
                    + ` been played by a needy slut just wanting to be used roughly like an onahole, ${authorName} suddenly got rougher,`
                    + ` ${mentionName}'s eyes rolling back as ${mentionSub} took the pounding ${mentionSub} wanted so badly.`
                    + ` ${mentionName}'s whole body shook hard against the wall and back against ${authorName} as ${authorSub} rammed`
                    + ` ${authorPos} cock right in to the hilt one more time, jerking off with ${mentionPos} cervix as ${authorSub}`
                    + ` violated ${mentionPos} womb; ${mentionSub} came so hard ${mentionSub} almost passed out as ${authorName} came hard,`
                    + ` raping ${mentionPos} womb roughly, using ${mentionObj} like ${mentionSub} was nothing but a cum receptacle.`
                    + ` As ${authorName} pulled out, ${authorPos} cum leaking down ${mentionName}'s thighs, ${mentionSub} slid down the`
                    + ` wall without the extra support, ending up in a puddle of used semen, ${mentionPos}  tongue mindlessly lapping`
                    + ` it up even as more oozed out of ${mentionPos} fuckholes and ${authorName} discarded ${mentionObj} like a used`
                    + ` condom in the alleyway to carry on with ${authorPos} day.`,

                    `Down on all fours, ${mentionName} was being violated so roughly, ${mentionPos}  bare tits swinging helplessly`
                    + ` as ${authorName} took ${mentionObj} from behind, forcing ${mentionObj} down against the mattress even as`
                    + ` ${mentionSub} tried to stay up on ${mentionPos} hands and knees. ${mentionName} couldn't take much more when`
                    + ` ${authorName}'s cock suddenly started to heat up, practically feeling like it was writhing inside ${mentionObj},`
                    + ` sending ${mentionObj} completely mad and over the edge, ${mentionPos} tongue hanging out already as`
                    + ` ${authorName}'s cum erupted directly into ${mentionPos} womb, feeling like ${mentionSub} was getting completely`
                    + ` and utterly filled up, ${mentionPos} womb feeling swollen, feeling like cum was glazing ${mentionObj} right to`
                    + ` ${mentionPos}  ovaries, only plugged inside by ${authorName}'s cock. ${mentionName} even came as ${authorName}`
                    + ` pulled out, feeling ${authorPos} cum gushing out of ${mentionObj} like a used condom.`,

                    `${authorName} rammed ${authorPos} cock into ${mentionName}'s tight, wet cockhole a few more times as ${authorSub}`
                    + ` suddenly felt ${authorPos} throbbing cock explode inside ${mentionObj} as ${mentionSub} toyed with ${mentionPos}`
                    + ` own clit, hilting ${authorObj}self right into ${mentionPos} fertile womb as ${mentionSub} got to feel the whole`
                    + ` shaft of ${authorPos} dick pulsing and throbbing and writhing inside, plastering ${mentionObj} with the contents`
                    + ` of ${authorPos} balls, panting as ${mentionSub} felt ${mentionObj}self used for ${mentionPos} proper purpose as`
                    + ` a cum toilet. ${authorName} pulled out slowly once ${authorPos} orgasm subsided, thick ropes of cum spilling out`
                    + ` of ${mentionName}'s cunt as ${authorSub} pulled out, semen running down onto ${mentionPos} ass and staining the`
                    + ` floor under ${mentionObj} as ${authorName} observed ${authorPos} handywork and the cumdrunk slut in front of`
                    + ` ${authorObj} as ${mentionSub} continued mindlessly teasing ${mentionPos} abused, sticky slit and hard clit,`
                    + ` looking ready for another load already.`,

                    `${mentionName} arched ${mentionPos} back further as ${authorName} grabbed ${mentionPos} hips and pulled`
                    + ` ${mentionObj} back onto ${authorPos} cock, forcing it deeper and deeper. ${mentionName} threw ${mentionPos}`
                    + ` head back, gripping the sheets as ${mentionSub} came hard on the cock violating ${mentionObj}, ${mentionPos}`
                    + ` orgasm growing more intense as ${authorName} continued pounding into ${mentionObj}, ${authorPos} cock`
                    + ` suddenly erupting a hot, thick creampie into the orgasming slut, leaving ${mentionObj} a panting, sticky mess.`,

                    `${mentionName} ground ${mentionObj}self happily on ${authorName}'s cock, ${mentionPos} tits bouncing hypnotically`
                    + ` as ${mentionSub} used ${mentionPos} tight cunt to jerk ${authorName}'s cock off, grinding ${mentionPos} hips down`
                    + ` against ${authorName}'s hips, panting and moaning, ${mentionPos} hands on ${authorName}'s chest for stability,`
                    + ` ${mentionPos} whole body being used for ${authorName}'s pleasure as ${authorName}'s cock suddenly starts throbbing`
                    + ` inside ${mentionPos} cunt desperately. ${mentionName} gave a smirk, speeding up ${mentionPos} movement, looking`
                    + ` smug as ${authorName} suddenly orgasmed into ${mentionPos} waiting cunt, groaning happily as ${mentionSub} felt`
                    + ` ${mentionObj}self getting filled. ${mentionName} leaned down, sliding a finger under ${mentionPos} short skirt`
                    + ` to reach the cum leaking out of ${mentionPos} cunt, scooping a fingerful up and bringing it to ${mentionPos} lips,`
                    + ` sucking it from ${mentionPos} fingers. “Mhmmm, same time tomorrow~?” ${mentionSub} asked playfully as ${mentionSub}`
                    + ` toyed with ${authorName}'s cum on ${mentionPos} tongue.`,

                    `“Come on, bitch, is that all you've got~?” ${mentionSub} panted playfully, gripping ${authorName}'s hips`
                    + ` as ${mentionSub} rammed ${mentionPos} own down against ${authorObj}, ${mentionPos} tight cunt wrapped`
                    + ` around ${authorName}'s cock while ${authorSub} groaned helplessly, being used like a cum dispenser by`
                    + ` this cum-hungry slut. “Or is this what you want, you naughty little whore~?” ${mentionName} asked as`
                    + ` ${mentionSub} slipped a couple of fingers down to ${authorName}'s ass, taking ${authorObj} by surprise,`
                    + ` the sudden stimulation pushing ${authorObj} over the edge and giving ${mentionName} exactly what`
                    + ` ${mentionSub} wanted: ${authorName}'s cum suddenly erupting inside ${mentionObj}. ${mentionName} gave`
                    + ` ${authorName} a superior smirk after forcing ${authorName} to submit to ${mentionPos} tight cunt.`
                    + ` “Ara~ ara~ what a dirty slut you are, cumming so hard just from me teasing your ass~” ${mentionSub}`
                    + ` added, sliding off from ${authorName}'s cock, holding open ${mentionPos} cunt so ${authorName} could`
                    + ` see ${authorPos} own cum drooling out of ${mentionObj}. “Mhmmm, does my new bitch want to lick me`
                    + ` clean~?” ${mentionSub} asked, licking ${mentionPos}  lips.`,

                    `${authorName} pushed ${mentionName}'s legs back over ${mentionPos} head, pressing ${mentionObj} into`
                    + ` the ground as ${authorSub} pounded ${mentionPos} tight cockhole, mating pressing the desperately`
                    + ` orgasming slut, unable to resist even if ${mentionSub} wanted to as ${authorName}'s semen painted`
                    + ` every inch of ${mentionPos} cunt with thick, creamy white semen. ${mentionName} shuddered in submission`
                    + ` to ${authorName}'s cock as ${authorSub} made ${mentionObj} ${authorPos} bitch.`,

                    `${authorName} rammed ${authorPos} throbbing cock into ${mentionName}'s wet cunt, ${authorPos} hands on`
                    + ` ${mentionName}'s thighs, pushing them back against ${mentionPos} body, mating pressing the slut into`
                    + ` submission while ${mentionName} desperately jerked someone else off onto ${mentionPos} own face,`
                    + ` grinding the sticky tip right against ${mentionPos} hot skin. ${authorName} pounded ${mentionName}'s`
                    + ` cunt harder and harder, desperately masturbating using ${mentionPos} tight cockhole, getting closer`
                    + ` and closer, ${authorPos} balls slapping against ${mentionObj} ass. As ${authorName} was right at the`
                    + ` edge, ${authorSub} saw the person getting a handjob explode in ${mentionName}'s hand, completely`
                    + ` splattering ${mentionPos} face with semen, the filthy sight pushing ${authorName} over the edge too;`
                    + ` ${authorSub} rammed ${authorPos} hips against ${mentionName} one more time as ${authorPos} cock throbbed`
                    + ` and pulsed deep inside, flooding ${mentionName}'s womb with thick, potent cum, pulling out to leave`
                    + ` the slut dripping cum from both ends.`,
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
            'facesit': {
                'is_valid': () => true,
                'tags': ['facesitting', '-fart', '-flatulence'],
                'global_tag_excludes': [ ],
                'messages': [
                    `${authorName} looked down at ${mentionName}'s eager face, as if to ask whether ${mentionSub}`
                    + ` was really sure this was what ${mentionSub} wanted. The gleam in ${mentionPos} eye told ${authorObj}`
                    + ` that ${authorSub} needn't have worried, taking a deep breath and lowering ${authorPos} bare ass`
                    + ` onto ${mentionPos} face, shuffling around a little to get comfortable.`
                    + ` Suddenly ${authorSub} jerked up when ${authorSub} felt ${mentionPos} tongue invading ${authorPos} wet hole.`
                    + ` Biting ${authorPos} lip, ${authorSub} started to grind ${authorObj}self down against ${mentionPos} face,`
                    + ` smearing ${authorPos} juices over ${mentionObj}, grinding against ${mentionPos} tongue while`
                    + ` ${mentionSub} groaned in appreciation that ${authorSub} was enjoying ${mentionPos} face, ${authorPos} new seat.`
                    + ` Hearing this, ${authorSub} got more bold, grabbing a handful of ${mentionPos} hair to force ${authorObj}self`
                    + ` harder against ${mentionObj}, grinding down, squeezing ${authorPos} face for pleasure, moaning out quietly at first`
                    + ` but getting louder as ${authorSub} got closer to climax, suddenly tightening ${authorPos} grip on ${mentionPos} hair`
                    + ` and ${authorPos} thighs around ${mentionPos} face as ${authorSub} utterly soaked ${mentionName}'s face with`
                    + ` ${authorPos} sticky fucksauce, ${authorPos} hips shaking as ${authorSub} came hard on ${mentionObj}.`
                    + ` Once ${authorSub} came down from ${authorPos} orgasm, ${authorSub} gave ${authorObj}self a wry smile;`
                    + ` ${authorName} was going to enjoy this new chair fully before ${authorSub} let ${mentionObj} go.`,

                    `Stomach full of ladybirds, ${authorName} lowers ${authorObj}self onto ${mentionName}'s attendant face.`
                    + ` ${authorName.uc()} looks up to the sky... and prays for forgiveness`
                ]
            },
            'facesitting': { 'redirect': 'facesit'},
            'smother': { 'redirect': 'facesit'},
            'smothering': { 'redirect': 'facesit'},
            'blowjob': {
                'is_valid': () => true,
                'tags': ['blowjob'],
                'global_tag_excludes': [],
                'messages': [

                ]
            },
            'bj': { 'redirect': 'blowjob'},
            'suck': { 'redirect': 'blowjob'},
            'swallow': { 'redirect': 'blowjob'},
            'lick': { 'redirect': 'blowjob'},
            'beej': { 'redirect': 'blowjob'},
                    
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

        const site = new Gelbooru(message, true);
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
                .setImage(post && post.image_url)
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
        if(option === options["ear"]) {
            option = resolveLocation(requestedLocation, options)
        }
    }

    while(option.redirect) {
        option = options[option.redirect];
    }

    return option;
}
