const { parseMentions } = require('../message-utils.js');
const { DB } = require('../db.js');

module.exports = {
    name: 'tribute_leaderboard',
    description: 'Whos the sluttiest of them all?',
    execute(message, args){
      //TODO: Add the fucking command lmao
      let topFiveUsers = [];
      let cumCounts = [];

      DB.query(`SELECT target_id, SUM(times) FROM cum_tribute_data GROUP BY target_id ORDER BY SUM(times)`,
        (rows, fields) => {
          for(let i = 0; i < rows.length; i++){
            console.log(rows[i]);
            topFiveUsers.push(rows[i]['target_id']);
            cumCounts.push(rows[i]['SUM(times)']);
          }
        }
      );

      for(let i = 0; i < topFiveUsers.length; i++){
        console.log('I ran.');
         console.log(`${topFiveUsers[i]} : ${cumCounts[i]}`);
      }

      return message.channel.send('This is a stub for the tribute_leaderboard command.')  
    },
};