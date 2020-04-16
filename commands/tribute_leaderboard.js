const { parseMentions } = require('../message-utils.js');
const { DB } = require('../db.js');

module.exports = {
    name: 'tribute_leaderboard',
    description: 'Whos the sluttiest of them all?',
    execute(message, args){
      //TODO: Add the fucking command lmao
      let topFiveUsers = [];
      let cumCounts = [];
      let page_offset;
      const page_length = 10;
      if(!args[0] || args[0] == 1 || args[0] == 0 || args[0] < 0 || args[0] >= 10000){
        page_offset = 0;
        if(args[0] > 10000){
          return message.channel.send(`Very funny. This is capped at 10000 pages.`)
        }
      }
      else{
        page_offset = (args[0]-1)*page_length;
      }
      let page_display = page_offset/page_length+1;
      let output_string = `***---Cumdump Tribute Leaderboard---***\n                          *Page ${page_display}*`;
      if(args.length > 1){
        console.log('The correct syntax of this command is "$tribute_leaderboard <page>". Page is optional.');
      }

      DB.query(`SELECT target_id, SUM(times) FROM cum_tribute_data GROUP BY target_id ORDER BY SUM(times) DESC LIMIT ${page_offset}, 10`,
        (rows, fields) => {
          for(let i = 0; i < rows.length; i++){
            topFiveUsers.push(rows[i]['target_id']);
            cumCounts.push(rows[i]['SUM(times)']);
          }
          for(let i = 0; i < topFiveUsers.length; i++){
             output_string = output_string + `\n**${message.client.users.resolve(topFiveUsers[i]).username}** : ${cumCounts[i]}`;
          }
          return message.channel.send(output_string);
    

        }
      );
    },
};