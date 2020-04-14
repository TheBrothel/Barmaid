module.exports = {
	name: 'mock',
	description: 'Show somewhat what they really sound like.',
	execute(message, args) {
		message.channel.messages.fetch({ limit: 10 })
			.then(messages => {		
				let _messages = messages;

				const mentions = [...message.mentions.users];
				if(mentions.length > 0) {
					const mentionedUser = mentions[0][0];
					_messages = messages.filter(m => m.author.id === mentionedUser);
				}

				_messages = [..._messages];

				if(_messages.length === 0) {
					message.reply(`No recent messages found for ${[...message.mentions.users][0][1].username}`);

					return;
				}

				const _message = _messages[1][1];
				let previousMessage = _message.cleanContent;
				let newMessage = '';
		
				let mode = false;
				
				for(let i = 0; i < previousMessage.length; i++) {
					newMessage += mode 
						? previousMessage[i].toUpperCase() 
						: previousMessage[i].toLowerCase();
		
					mode = !mode;
				}
		
				message.channel.send('> ' + newMessage);
			})
			.catch(console.error);
	},
};