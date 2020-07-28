const Discord = require('discord.js');
const { Gelbooru, Danbooru, Yandere, BooruXXX } = require('../image-board.js');

module.exports = {
	name: 'hentai',
	description: 'Search for hentai by tags',
	async execute(message, args) {
		let sites = [
			new Gelbooru(message, true),
			new Danbooru(message, true),
			new BooruXXX(message, true),
			new Yandere(message, true),
		].filter(f => f.canSearch(args));

		shuffleArray(sites);

		let site;
		let index = 0;
		let result = null;

		do {
			site = sites[index];

			index++;

			result = await site.search(args);
		} while(result === null && index < sites.length);

		if(result === null) {
			return message.channel.send(`No results found for any sites`);
		}

		return site.embedPost(result);
	},
};

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
	}
	
	return array;
}