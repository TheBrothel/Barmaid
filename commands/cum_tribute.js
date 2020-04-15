const { DB } = require('../db.js');
module.exports = {
  name: 'cumtribute',
  description: 'Nut.',
  execute(message, args){
    if(!args[0]) return;

    const tribute = message.mentions.members.first();
    const donor = message.author.username;
    if(args[0] == 'leaderboard'){
      return message.channel.send('This is a stub for the leaderboard sub-command.');
    }
    if(args[0] == 'userinfo' && tribute){
      return message.channel.send('This is a stub for the userinfo sub-command.')
    }
    if(!tribute) return;
    //Talk to the server and update the stats
    const authorId = message.author.id;
    const firstMentionId = [...message.mentions.users][0][0];
    DB.query(`INSERT INTO cum_tribute_data (user_id, target_id, times) VALUES ('${authorId}', '${firstMentionId}', 1) ON DUPLICATE KEY UPDATE times = times + 1`, null);
    //End server stuff
    return message.channel.send(donor + ` tributed one load to ${tribute.displayName}`);
  },
};
