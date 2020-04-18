const Discord = require('discord.js');
const { Gelbooru } = require('../image-board.js');

module.exports = {
	name: 'gelbooru',
	description: 'Search for hentai by tags on gelbooru',
	async execute(message, args) {
		const site = new Gelbooru(message);
		
		const post = await site.search(args);

		if(post === null) return site.sendNoResultsError(args);

		return site.embedPost(post);
	},
};