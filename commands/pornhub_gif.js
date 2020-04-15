const Discord = require('discord.js');
const axios = require('axios');
const { parse } = require('node-html-parser');

module.exports = {
	name: 'gifme',
	description: 'Search for GIFs on PornHub',
	execute(message, args) {
		search(message, args);
	},
};

function search(message, tags) {
	const baseUrl = 'https://www.pornhub.com/gifs';
	const searchUrl = baseUrl + '/search?search=' + tags.join(' ');

	const url = tags.length ? searchUrl : baseUrl;

	return axios.get(url)
	.then(response => {
		if(!response.data) return this.sendNoResultsError(tags);

		const parsedPage = parse(response.data);

		const gifs = parsedPage.querySelectorAll('.gifVideoBlock');
		const gif = gifs.random();
		const link = /href=['"](.+?)['"]/i.exec(gif.querySelector('a').rawAttrs)[1];
		const video = gif.querySelector('video');
		const title = gif.querySelector('span').rawText;

		const videoUrl = /data\-webm=['"](.+?)['"]/i.exec(video.rawAttrs)[1];
		const videoFilename = /([^\/]+?\.webm)$/i.exec(videoUrl)[1];

		let postEmbed = new Discord.MessageEmbed()
			.setTitle(title)
			.setURL('https://www.pornhub.com' + link);

		message.channel.send(postEmbed);
		message.channel.send({
			files: [videoUrl]
		});
	})
	.catch(error => {
		console.log(error);
	});
}