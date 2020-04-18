const Discord = require('discord.js');
const { Yandere } = require('../image-board.js');

module.exports = {
	name: 'yandere',
	description: 'Search for hentai by tags on yandere',
	async execute(message, args) {
		const site = new Yandere(message);
		
		const post = await site.search(args);

		if(post === null) return site.sendNoResultsError(args);

		return site.embedPost(post);
	},
};