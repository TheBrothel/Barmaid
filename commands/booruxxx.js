const Discord = require('discord.js');
const { BooruXXX } = require('../image-board.js');

module.exports = {
	name: 'booruxxx',
	description: 'Search for hentai by tags on booruxxx',
	async execute(message, args) {
		const site = new BooruXXX(message);
		
		const post = await(site.search(args));

		if(post === null) return site.sendNoResultsError(args);

		return site.embedPost(post);
	},
};