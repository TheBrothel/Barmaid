const { parseMentions } = require('../message-utils.js');
const { DB } = require('../db.js');

module.exports = {
    name: 'tribute',
    description: 'Nut!',
    execute(message, args){
        //Get the stuff we need to work with
        const author = message.author;
        const mentions = parseMentions(message);
        const firstMention = mentions[0];

        //Make sure there was a user tagged
        if(!firstMention) return;

        //Talk to the server and update the stats
        DB.query(`INSERT INTO cum_tribute_data (user_id, target_id, times) VALUES ('${author.id}', '${firstMention.id}', 1) ON DUPLICATE KEY UPDATE times = times + 1`, null);
        //Notify the world that someone nutted.
        //TODO: Add support for displayName output rather than username. Probably need to resolve it somehow.
        return message.channel.send(`${author.username} tributed one load to ${firstMention.username}`);
    },
};