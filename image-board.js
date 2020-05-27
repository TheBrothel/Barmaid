const axios = require('axios');
const { parse } = require('node-html-parser');
const Discord = require('discord.js');

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
			this.message.channel.send(`Too many tags for ${this.displayName} (${fullTags.length}/${this.maxTags}) :frowning:`);

			return;
		}

		try {
			return this.doSearch(fullTags);
		} catch(e) {
			this.message.channel.send(e);

			return null;
		}
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
		return this.message.channel.send(`No results found on ${this.displayName} for \`${tags}\` :frowning:`);
	}
};

// Image boards that allow a JSON response.
class JSONImageBoard extends ImageBoard {
	async doSearch(tags) {
		const response = await axios.get(this.buildSearchURL(tags))
			.catch((e) => {
				console.log(e);

				return null;
			});

		if(!response || !response.data || response.data.length === 0) return null;

		return this.parseSearchResponse(response);
	}

	// JSON-specific parser for the search resonse.
	// Returns a post object.
	parseSearchResponse(response) {
		return this.post;
	}
};

class Gelbooru extends JSONImageBoard  {
	constructor(message) {
		const baseUrl = 'https://gelbooru.com/index.php?page=';
		const searchUrl = baseUrl + 'dapi&s=post&q=index&json=1&tags=';
		const postUrl = baseUrl + 'post&s=view&id=';
	
		const forcedTags = [
			'sort:random',
			'-loli',
			'-shota',
			'-straight_shota',
			'-guro',
			'score:>=0',
			'-blood',
			'-urine',
			'-pregnant',
            '-furry', 
			'-*absurdres', 
			'-rating:safe',
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
};

class Danbooru extends JSONImageBoard  {
	constructor(message) {
		const baseUrl = 'https://danbooru.donmai.us/';
		const searchUrl = baseUrl + 'posts.json?random=1&tags=';
		const postUrl = baseUrl + 'posts/';
	
		const forcedTags = [
			'-loli',
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
		const firstResponse = response.data
			.filter(f => !f.is_deleted && !f.is_banned)
			.random();

		return {
			id: firstResponse.id,
			image_url: firstResponse.large_file_url || firstResponse.file_url,
			score: firstResponse.up_score - firstResponse.down_score,
			artist: firstResponse.tag_string_artist,
			copyright: firstResponse.tag_string_copyright,
			character: firstResponse.tag_string_character,
		};
	}
};

class Yandere extends JSONImageBoard  {
	constructor(message) {
		const baseUrl = 'https://yande.re/';
		const searchUrl = baseUrl + 'post.json?tags=';
		const postUrl = baseUrl + 'post/show/';
	
		const forcedTags = [
			'order:random',
			'-loli',
			'-rating:safe'
		];

		super(
			message,
			'yande.re',
			baseUrl,
			searchUrl,
			postUrl,
			forcedTags,
			6
		);
	}

	parseSearchResponse(response) {
		const firstResponse = response.data.random();

		return {
			id: firstResponse.id,
			image_url: firstResponse.sample_url || firstResponse.file_url,
			score: firstResponse.score,
			artist: null,
			copyright: null,
			character: null,
		};
	}
};

class BooruXXX extends ImageBoard  {
	constructor(message) {
		const baseUrl = 'https://booru.xxx/index.php';
		const searchUrl = baseUrl + '?q=/post/list/';
		const postUrl = baseUrl + '?q=/post/view/';
	
		const forcedTags = [
		];

		super(
			message,
			'BooruXXX',
			baseUrl,
			searchUrl,
			postUrl,
			forcedTags,
			0
		);
	}
	
	buildSearchURL(tags, page) {
		if(page) {
			page = Math.floor(Math.random() * page) + 1;
		}

		return this.searchUrl + tags.join(' ') + (page ? `/${page}` : '/1');
	}

	async doSearch(tags) {
		const firstResponse = await axios.get(this.buildSearchURL(tags));
		
		if(!firstResponse.data) return null;

		const parsedPage = parse(firstResponse.data);

		let maxPages = parsedPage.querySelector('#paginator');

		if(!maxPages) return null;
			
		maxPages = maxPages.querySelectorAll('a');

		if(!maxPages || maxPages.length === 0) return null;

		maxPages = maxPages.last(2).rawText;

		if(!maxPages) return null;
			
		const secondResponse = await axios.get(this.buildSearchURL(tags, maxPages));
		
		if(!secondResponse.data) return null;
	
		const parsedPage2 = parse(secondResponse.data);

		return this.parseSearchResponse(parsedPage2);
	}

	parseSearchResponse(parsedPage) {
		const firstResponse = parsedPage
			.querySelector('#Imagesmain')
			.querySelectorAll('a.shm-thumb-link')
			.random()
			.rawAttrs;

		const id = /data\-post\-id=.(\d+)./i.exec(firstResponse)[1];

		return {
			id: id,
			image_url: this.baseUrl + `?q=/image/${id}`,
			score: null,
			artist: null,
			copyright: null,
			character: null,
		};
	}
};

module.exports =  { 
    ImageBoard, 
    JSONImageBoard, 
    Gelbooru, 
    Yandere, 
    Danbooru, 
    BooruXXX 
};