module.exports = {
	name: 'fuck',
	description: 'Just fuck \'em',
	execute(message, args) {
		if (!args[0]) return;

		const member = message.mentions.members.first();
		if (!member) return;

		return message.channel.send(`Yeah! Fuck ${member.displayName}`);
	},
};