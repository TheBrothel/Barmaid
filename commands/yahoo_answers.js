const Discord = require('discord.js');
const axios = require('axios');
const { parse } = require('node-html-parser');

module.exports = {
	name: 'answer',
	description: 'Search yahoo answers',
	execute(message, args) {
		search(message, args);
	},
};

function search(message, tags) {
	const baseUrl = 'https://answers.search.yahoo.com';
	const searchUrl = baseUrl + '/search?p=' + tags.join(' ');

	axios.get(searchUrl)
	.then(response => {
		if(!response.data) return this.sendNoResultsError(tags);

		const parsedPage = parse(response.data);

		const questions = parsedPage
			.querySelector('.searchCenterMiddle')
			.querySelectorAll('li');
		const question = questions.random();
		const title = question.querySelector('.title').querySelector('a');

		const questionLink = /href=['"](.+?)['"]/i.exec(title.rawAttrs)[1];

		axios.get(questionLink)
		.then(response => {
			if(!response.data) return this.sendNoResultsError(tags);

			const parsedQuestionPage = parse(response.data);

			const answers = parsedQuestionPage
				.querySelectorAll('div')
				.filter(f => /__answer___/.test(f.rawAttrs));
			const answer = answers.random();
			
			const answerContent = answer
				.querySelectorAll('div')
				.filter(f => /__content__/.test(f.rawAttrs))[0]
				.querySelectorAll('p')
				.map(f => f.text)
				.join('\n\n');

			let postEmbed = new Discord.MessageEmbed()
				.setTitle(title.text)
				.setURL(questionLink)
				.setDescription(answerContent);
	
			message.channel.send(postEmbed);
		})
		.catch(error => {
			console.log(error);
		});
	})
	.catch(error => {
		console.log(error);
	});
}