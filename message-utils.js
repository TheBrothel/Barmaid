const Discord = require('discord.js');

const GenderRoles = {
    'RP - Male': {
        name: 'male',
        pronouns: {
            subject: 'he',
            object: 'him',
            possessive: 'his'
        }
    },
    'RP - Female': {
        name: 'female',
        pronouns: {
            subject: 'she',
            object: 'her',
            possessive: 'her'
        }
    },
    'RP - Futa': {
        name: 'futa',
        pronouns: {
            subject: 'she',
            object: 'her',
            possessive: 'her'
        }
    },
    'default': {
        name: 'other',
        pronouns: {
            subject: 'they',
            object: 'them',
            possessive: 'their'
        }
    },
};

function getUserFromMention(mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.cache.get(mention);
	}
}

function parseMentions(message) {
    // Match all user mentions.
    const matches = [...message.content.matchAll(/<@!?(\d+)>/ig)];

    // No user mentions found.
    if (!matches) return;

    let users = [];

    for(let i = 0; i < matches.length; i++) {
        users.push(message.client.users.resolve(matches[i][1]));
    }
    //Should return an array of UIDs in left to right order.
    return users;
}

function authorIsAdmin(message) {
    return message.member.permissions.has(Discord.Permissions.ADMINISTRATOR);
}

// Returns the array of stuff associated with the member's
// chosen gender role.
function getMemberGenderRole(member) {
    for (const [role, properties] of Object.entries(GenderRoles)) {
        if(member.roles.cache.find(f => f.name === role)){
            return properties;
        }
    }

    return GenderRoles['default'];
}

function getMemberPronounSubject(member) {
    return getMemberPronoun(member, 'subject');
}

function getMemberPronounPossessive(member) {
    return getMemberPronoun(member, 'possessive');
}

function getMemberPronounObject(member) {
    return getMemberPronoun(member, 'object');
}

function getMemberPronoun(member, partOfSpeech) {
    var props = getMemberGenderRole(member);

    return props.pronouns[partOfSpeech];
}

module.exports = {
    getUserFromMention,
    parseMentions,
    authorIsAdmin,
    getMemberPronounPossessive,
    getMemberPronounSubject,
    getMemberPronounObject,
    getMemberGenderRole,
}