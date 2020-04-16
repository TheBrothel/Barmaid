const Discord = require('discord.js');
const { Danbooru } = require('../image-board.js');

module.exports = {
	name: 'danbooru',
	description: 'Search for hentai by tags on danbooru',
	execute(message, args) {
		const site = new Danbooru(message);
		site.embedPost(site.search(args));
	},
};