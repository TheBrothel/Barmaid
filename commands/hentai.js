const axios = require('axios');
const { parse } = require('node-html-parser');
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
			site = sites.random();
			attempts++;
		} while(!site.canSearch(args) && attempts < maxAttempts);

		site.search(args);
	},
};

// Base class for all image boards.
class ImageBoard {
	displayName;
	message;
	baseUrl;
	searchUrl;
	postUrl;
	forcedTags;
	maxTags;
	post = {
		id: null,
		image_url: null,
		score: null,
		artist: null,
		copyright: null,
		character: null,
	};

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

	// Checks if the requested and enforced tags are under the allowed limit.
	canSearch(tags) {
		const allTagsCount = this.forcedTags.length + tags.length;

		return this.maxTags <= 0 || allTagsCount<= this.maxTags;
	}

	// Performs the search for the given tags.
	search(tags) {
		const fullTags = [...this.forcedTags, ...tags];

		if(!this.canSearch(tags)){
			this.message.channel.send(`Too many tags for ${this.DisplayName} (${fullTags.length}/${this.maxTags}) :frowning:`);

			return;
		}

		this.doSearch(fullTags);
	}

	// Site-specific logic to build the search URL with tags.
	//
	// Overridable.
	buildSearchURL(tags) {
		return this.searchUrl + tags.join(' ');
	}

	// Site-specific logic to issue the network requests 
	// and parse the responses.
	//
	// Overridable.
	doSearch(tags) {
		return null;
	}

	// Builds and sends the Discord Embed object 
	// based on the search results.
	embedPost(post) {
		let postEmbed = new Discord.MessageEmbed()
			.setTitle(this.displayName)
			.setURL(this.buildPostURL(post))
			.setImage(post.image_url);

		postEmbed = this.buildFields(post, postEmbed);

		this.message.channel.send(postEmbed);
	}

	// Builds the site-specific field strings.
	//
	// Overridable.
	buildFields(post, embed) {
		if(post.copyright)
			embed.addField('Copyright', post.copyright, true);
			
		if(post.character)
			embed.addField('Character', post.character, true);
			
		if(post.artist)
			embed.addField('Artist', post.artist, true);

		if(post.score)
			embed.addField('Score', post.score, true);

		return embed;
	}

	// Builds the site-specific post URL.
	//
	// Overridable.
	buildPostURL(post) {
		return this.postUrl + post.id;
	}

	sendNoResultsError(tags) {
		return this.message.channel.send(`No results found on ${this.DisplayName} for \`${tags}\` :frowning:`);
	}
};

// Image boards that allow a JSON response.
class JSONImageBoard extends ImageBoard {
	doSearch(tags) {
		axios.get(this.buildSearchURL(tags))
		.then(response => {
			if(!response.data) return this.sendNoResultsError(tags);

			this.post = this.parseSearchResponse(response);

			this.embedPost(this.post);
		})
		.catch(error => {
			console.log(error);
		});
	}

	// JSON-specific parser for the search resonse.
	// Returns a post object.
	parseSearchResponse(response) {
		return this.post;
	}
}

class Gelbooru extends JSONImageBoard  {
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
			'-guro',
			'score:>=0'
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

	parseSearchResponse(response) {
		const firstResponse = response.data.random();

		return {
			id: firstResponse.id,
			image_url: firstResponse.file_url,
			score: firstResponse.score,
			artist: null,
			copyright: null,
			character: null,
		};
	}
}

class Danbooru extends JSONImageBoard  {
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

	parseSearchResponse(response) {
		const firstResponse = response.data.random();

		return {
			id: firstResponse.id,
			image_url: firstResponse.large_file_url || firstResponse.file_url,
			score: firstResponse.up_score - firstResponse.down_score,
			artist: firstResponse.tag_string_artist,
			copyright: firstResponse.tag_string_copyright,
			character: firstResponse.tag_string_character,
		};
	}
}