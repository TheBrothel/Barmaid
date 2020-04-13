module.exports = {
	name: '8ball',
	description: 'Answers for questions',
	execute(message, args) {
		const responses = [
			'Try again later :alarm_clock:',
			'Who knows :shrug:',
			'The chances look good :slight_smile:',
			'The chances look poor :frowning:',
			':100:% guaranteed',
			'That\'s literally impossible :neutral_face:',
			'What kind of a stupid question is that? :weary:',
			'Only on Tuesdays :calendar:',
			'Who the fuck cares? :sunglasses:',
			'Sir, this is a Wendy\'s... :hamburger:',
			'No, because Jesus doesn\'t like how often you touch yourself at night',
			`:unamused: Look, ${message.author.username}... May I call you "${message.author.username}"?... Stop worrying about pointless stuff. Just go jerk off or something...`,
			'Yes. Nothing can stop you. You can conquer the world! You\'re literally immortal!! :rage:',
			':mage: The spirits say~... ||Do your laundry||',
			':mage: The spirits say~... ||You\'ll never get this time back||',
			':mage: The spirits say~... ||Maybe, if you stop having sinful thoughts||',
			':mage: The spirits say~... ||Only if you believe in yourself||',
			':mage: The spirits say~... ||You\'ve already used all your karma||',
			':mage: The spirits say~... ||I\'ll suck your dick for $5||',
			':mage: The spirits say~... ||No hablo ingles||',
			'Yeah, I think I read about that on facebook, so it must be true :wink:',
			`I was saying the exact same thing to this kid at the bus stop the other day. I was like "${message.content}" and she was just blown away by the genius of it...`,
			'No.',
			'Yes.',
			'Sure?',
			':game_die: I wouldn\'t bet on it...',
			'Absolutely! And I\'m so confident in that answer that I\'ll put my newborn baby down as collateral :baby:',
			'I mean, does a cum-sucker suck cum? :milk:',
			'Not with that attitude',
		];

		return message.channel.send(`> ${args.join(' ')}\n${message.author}\n\n${responses.random()}`);
	},
};