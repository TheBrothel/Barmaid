const axios = require('axios');
const Discord = require('discord.js');

module.exports = {
	name: 'hentai',
	description: 'Search for hentai by tags',
	execute(message, args) {
		const sites = [
			new Gelbooru(message),
			new Danbooru(message),
		];

		let site;
		let attempts = 0;
		const maxAttempts = sites.length * 2;

		do {
			site = sites[Math.floor(Math.random() * sites.length)];
			attempts++;
		} while(!site.canSearch(args) && attempts < maxAttempts);

		site.search(args);
	},
};

class ImageBoard {
	constructor(
		message, 
		displayName,
		baseUrl, 
		searchUrl, 
		postUrl, 
		forcedTags,
		maxTags
	) {
		this.displayName = displayName;
		this.message = message;
		this.baseUrl = baseUrl;
		this.searchUrl = searchUrl;
		this.postUrl = postUrl;
		this.forcedTags = forcedTags;
		this.maxTags = maxTags;
	}

	canSearch(tags) {
		return this.maxTags <= 0 
			|| (this.forcedTags.length + tags.length) <= this.maxTags;
	}

	search(tags) {
		const fullTags = [...this.forcedTags, ...tags];

		if(!this.canSearch(tags)){
			this.message.channel.send(`Too many tags for ${this.DisplayName} (${fullTags.length}/${this.maxTags}) :frowning:`);

			return;
		}

		axios.get(this.searchUrl + fullTags.join(' '))
			.then(response => {

				if(!response.data[0]){
					this.message.channel.send(`No results found on ${this.DisplayName} :frowning:`);

					return;
				}

				const post = response.data[0];

				this.embedPost(post);
			})
			.catch(error => {
				console.log(error);
			});
	}

	embedPost(post) {
		const postEmbed = new Discord.MessageEmbed()
			.setTitle(this.displayName)
			.setURL(this.postUrl + post.id)
			.setImage(post.file_url);

		const footer = this.buildFooter(post);
		if(footer) postEmbed.setFooter(footer);

		this.message.channel.send(postEmbed);
	}

	buildFooter(post){
		return null;
	}
};

class Gelbooru extends ImageBoard  {
	constructor(message) {
		const baseUrl = 'https://gelbooru.com/index.php?page=';
		const searchUrl = baseUrl + 'dapi&s=post&q=index&json=1&tags=';
		const postUrl = baseUrl + 'post&s=view&id=';
	
		const forcedTags = [
			'rating:explicit',
			'sort:random',
			'-loli',
			'-shota',
			'-straight_shota',
			'-guro'
		];

		super(
			message,
			'Gelbooru',
			baseUrl,
			searchUrl,
			postUrl,
			forcedTags,
			0
		);
	}

	buildFooter(post) {
		return `Score: ${post.score}`;
	}
}

class Danbooru extends ImageBoard  {
	constructor(message) {
		const baseUrl = 'https://danbooru.donmai.us/';
		const searchUrl = baseUrl + 'posts.json?random=1&tags=';
		const postUrl = baseUrl + 'posts/';
	
		const forcedTags = [
			'rating:explicit',
		];

		super(
			message,
			'Danbooru',
			baseUrl,
			searchUrl,
			postUrl,
			forcedTags,
			2
		);
	}

	buildFooter(post) {
		return `Score: ${post.up_score - post.down_score}`
			+ ` | Copyright: ${post.tag_string_copyright}`
			+ ` | Artist: ${post.tag_string_artist}`;
	}
}