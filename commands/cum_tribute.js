const { DB } = require('../db.js');
module.exports = {
  name: 'cumtribute',
  description: 'Nut.',
  execute(message, args){
    if(!args[0]) return;

    const tribute = message.mentions.members.first();
    const donor = message.author.username;
    if(!tribute) return;
    //Talk to the server and update the stats
    const authorId = message.author.id;
    const firstMentionId = [...message.mentions.users][0][0];
    DB.query(`INSERT INTO cum_tribute_data (user_id, target_id, times) VALUES ('${authorId}', '${firstMentionId}', 1) ON DUPLICATE KEY UPDATE times = times + 1`, null);
    //End server stuff
    return message.channel.send(donor + ` tributed one load to ${tribute.displayName}`);
  },
};
