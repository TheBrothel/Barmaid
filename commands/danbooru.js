const Discord = require('discord.js');
const { Danbooru } = require('../image-board.js');

module.exports = {
	name: 'danbooru',
	description: 'Search for hentai by tags on danbooru',
	async execute(message, args) {
		const site = new Danbooru(message);
		
		const post = await site.search(args);

		if(post === null) return site.sendNoResultsError(args);

		return site.embedPost(post);
	},
};