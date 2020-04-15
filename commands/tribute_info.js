const { parseMentions } = require('../message-utils.js');
const { DB } = require('../db.js');

module.exports = {
    name: 'tribute_info',
    description: 'Who came on/in whom?',
    execute(message, args){
        //Get stuff we need to work with
        const mentions = parseMentions(message);
        const firstMention = mentions[0];
        const secondMention = mentions[1];
        //Check to make sure the syntax is correct.
        if(!args[0] || args.length > 2){
            return message.channel.send('The correct syntax of this command is "$tribute_info @tributer @tributee"');
        }
        //Execute command
        DB.query(`SELECT times FROM cum_tribute_data WHERE user_id = '${firstMention.id}' AND target_id = '${secondMention.id}'`, 
        (rows, fields) => {
          //Notify everyone of the orgasm count!
          return message.channel.send(`${firstMention.username} has tributed ${rows[0]['times']} loads to ${secondMention.username}`);
        }
      );
    },
};