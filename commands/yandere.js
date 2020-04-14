const Discord = require('discord.js');
const { Yandere } = require('../image-board.js');

module.exports = {
	name: 'yandere',
	description: 'Search for hentai by tags on yandere',
	execute(message, args) {
		new Yandere(message).search(args);
	},
};