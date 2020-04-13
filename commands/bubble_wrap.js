module.exports = {
	name: 'bubble_wrap',
	description: 'Just therapy',
	execute(message, args) {
		const probabilities = [
			0.01,
			0.2,
			1,
		];	

		const values = [
			' :tada: ',
			' :high_brightness: ',
			' :eye_in_speech_bubble: ',
		];

		const gridSize = 5;

		let text = '';

		for(let i = 0; i < gridSize; i++)
		{
			for(let j = 0; j < gridSize; j++)
			{
				const cell = values[getCell(probabilities)];

				if(j > 0) text += ' ';

				text += '||' + cell + '||';

				if(j < gridSize - 1) text += ' ';
			}

			if(i < gridSize - 1) text += '\n';
		}
		
		return message.channel.send(text);
	},
};

function getCell(probabilities) {
	const roll = Math.random();

	for(let i = 0; i < probabilities.length; i++) {
		if(roll <= probabilities[i]){
			return i;
		}
	}
}