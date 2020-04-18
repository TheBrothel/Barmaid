module.exports = {
	name: 'mock',
	description: 'Show someone what they really sound like.',
	execute(message, args) {
		const mentions = [...message.mentions.users];
		const hasMentions = mentions.length > 0;

		// If we're not given any mentions but are given text arguments.
		const hasText = args.length > 0 && !hasMentions;

		if(hasMentions) {
			return handleRequestedMention(mentions, message, 100);
		}
		else if(hasText) {
			return handleRequestedText(message, args);
		}
		
		return handleRequestedNothing(message, 5);
	},
};

async function handleRequestedNothing(message, messageHistoryLimit) {
	let previousMessages = await getPreviousMessagesAsync(message.channel, messageHistoryLimit);

	let previousMessage = filterMessages(previousMessages, message);

	if(previousMessage === false) {
		return message.reply(`No recent messages found`);
	}

	return createNewMessage(previousMessage, message.channel);
}

// Processed the command when we're given raw text.
function handleRequestedText(message, args) {
	return createNewMessage(args.join(' '), message.channel);
}

// Processes the command when we're given a user mention.
async function handleRequestedMention(mentions, message, messageHistoryLimit) {
	const mentionedUser = mentions[0];
	const mentionedUserId = mentionedUser[0];
	const mentionedUserUsername = mentionedUser[1].username;

	let previousMessages = await getPreviousMessagesAsync(message.channel, messageHistoryLimit);
	previousMessages = previousMessages.filter(m => m.author.id === mentionedUserId);

	let previousMessage = filterMessages(previousMessages, message);

	if(previousMessage === false) {
		return message.reply(`No recent messages found for ${mentionedUserUsername}`);
	}

	return createNewMessage(previousMessage, message.channel);
}

// Retrieves the previous {number} messages from the given
// channel.
//
// Returns a promise.
function getPreviousMessagesAsync(channel, number) {
	return channel.messages.fetch({ limit: number });
}

function filterMessages(_messages, message) {
	// Filter out the message that triggered this command.
	_messages = _messages.filter(m => m.id !== message.id);

	// Get an array of the message objects.
	_messages = [..._messages];

	if(_messages.length === 0) {
		return false;
	}

	// Return our last good message's normalized text.
	return _messages[0][1].cleanContent;
}

// Turns the text into mocked text and sends the reply.
function createNewMessage(previousMessage, channel) {
	let newMessage = '';

	let mode = false;
	
	for(let i = 0; i < previousMessage.length; i++) {
		newMessage += mode 
			? previousMessage[i].toUpperCase() 
			: previousMessage[i].toLowerCase();

		mode = !mode;
	}

	return channel.send('> ' + newMessage);
}