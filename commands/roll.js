const Discord = require('discord.js');

module.exports = {
	name: 'roll',
	description: 'RNG',
	execute(message, args) {
		let sides = 6;
		let dice = 1;

		if(args.length > 2) {
			return message.reply('Please use this command like `$roll 2 d6` or `$roll d20`');
		}

		for(let i = 0; i < args.length; i++) {
			const matches = /^d(\d+)$/i.exec(args[i]);

			if(matches && matches.length == 2) {
				sides = matches[1];
			} else if (/^\d+$/.test(args[i])) {
				dice = args[i];
			}
		}

		let results = [];
		let total = 0;
		let average = 0;
		let min = sides;
		let max = 0;

		let embed = new Discord.MessageEmbed()
			.setTitle(`:game_die: Rolling ${dice} D${sides}...`);

		let content = '';

		// Do the rolls.
		for(let i = 0; i < dice; i++) {
			const result = Math.floor(Math.random() * sides) + 1;
			results.push(result);
			total += result;
			
			min = Math.min(min, result);
			max = Math.max(max, result);
		}

		results.sort(function(a, b){ return b - a });

		embed.setDescription('**' + results.join('** , **') + '**');

		if (dice > 1) {
			average = total / dice;

			embed.addField('Total', total, true);
			embed.addField('Average', average, true);
			embed.addField('\u200b', '\u200b', true); // Blank field
			embed.addField('Min', min, true);
			embed.addField('Max', max, true);
			embed.addField('\u200b', '\u200b', true); // Blank field
		}

		message.channel.send(embed);
	},
};