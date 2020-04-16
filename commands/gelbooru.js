const Discord = require('discord.js');
const { Gelbooru } = require('../image-board.js');

module.exports = {
	name: 'gelbooru',
	description: 'Search for hentai by tags on gelbooru',
	execute(message, args) {
		const site = new Gelbooru(message);
		site.embedPost(site.search(args));
	},
};