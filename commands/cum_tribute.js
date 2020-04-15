const { parseMentions } = require('../message-utils.js');
const { DB } = require('../db.js');

module.exports = {
  name: 'cumtribute',
  description: 'Nut.',
  execute(message, args){

    if(!args[0]) return;

    //TODO: These are a bit sloppy. Clean up later.
    const mention = message.mentions.members.first();
    const donor = message.author.username;
    const authorId = message.author.id;
    
    const mentions = parseMentions(message);
    const firstMentionId = mentions[0];
    const secondMessageId = mentions[1];
    if(args[0] == 'leaderboard'){
      //DB.query();
      return message.channel.send('This is a stub for the leaderboard sub-command.');
    }
    if(args[0] == 'userinfo' && mention){
      DB.query(`SELECT times FROM cum_tribute_data WHERE user_id = '${firstMentionId}' AND target_id = '${$secondMentionId}'`, 
        (rows, fields) => {
          console.log(rows[0]['times']);
        }
      );
      return message.channel.send('This is a stub for the userinfo sub-command.')
    }
    if(!mention) return;
    //Talk to the server and update the stats
    DB.query(`INSERT INTO cum_tribute_data (user_id, target_id, times) VALUES ('${authorId}', '${firstMentionId}', 1) ON DUPLICATE KEY UPDATE times = times + 1`, null);
    //End server stuff
    return message.channel.send(donor + ` tributed one load to ${mention.displayName}`);
  },
};
