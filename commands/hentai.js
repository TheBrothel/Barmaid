const Discord = require('discord.js');
const { Gelbooru, Danbooru, Yandere, BooruXXX } = require('../image-board.js');

module.exports = {
	name: 'hentai',
	description: 'Search for hentai by tags',
	async execute(message, args) {
		const sites = [
			new Gelbooru(message),
			new Danbooru(message),
			new BooruXXX(message),
			new Yandere(message),
		];

		let site;
		let attempts = 0;
		const maxAttempts = sites.length * 2;

		do {
			site = sites.random();
			attempts++;
		} while(!site.canSearch(args) && attempts < maxAttempts);

		site.embedPost(await site.search(args));
	},
};