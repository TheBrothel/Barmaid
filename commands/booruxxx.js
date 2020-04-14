const Discord = require('discord.js');
const { BooruXXX } = require('../image-board.js');

module.exports = {
	name: 'booruxxx',
	description: 'Search for hentai by tags on booruxxx',
	execute(message, args) {
		new BooruXXX(message).search(args);
	},
};