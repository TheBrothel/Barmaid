const { parseMentions } = require('../message-utils.js');
const { DB } = require('../db.js');
const Discord = require('discord.js');

module.exports = {
    name: 'tribute_leaderboard',
    description: 'Whos the sluttiest of them all?',
    execute(message, args){
      let topFiveUsers = [];
      let cumCounts = [];
      let page_offset;
      let page = 0;
      const page_length = 10;
      const nf = Intl.NumberFormat();

      if(args.length > 1){
        console.log('The correct syntax of this command is "$tribute_leaderboard <page>". Page is optional.');
      }

      page = Math.min(Math.max(Math.floor(args[0] || 0) - 1, 0), Math.floor(Number.MAX_SAFE_INTEGER / page_length));
      page_offset = page * page_length;

      let embed = new Discord.MessageEmbed()
        .setTitle(':medal: Cumdump Tribute Leaderboard :medal:')

      let output_strings = [];

      // Query two things:
      // 1. The sum of stats for each target.
      // 2. The total number of distinct targets, to find the number of pages available.
      DB.query(`SELECT targets, a.* \
        FROM (SELECT target_id, SUM(times) FROM cum_tribute_data \
        GROUP BY target_id ORDER BY SUM(times) DESC LIMIT ${page_offset}, ${page_length}) a, \
        (SELECT COUNT(DISTINCT target_id) AS targets FROM cum_tribute_data) t`,
        (rows, fields) => {
          const total_targets = rows[0]['targets'];

          for(let i = 0; i < rows.length; i++){
            const rank = i + page_offset + 1;
            const userId = rows[i]['target_id'];

            if(!userId)
              continue;

            const user = message.client.users.resolve(userId);

            if(!user)
              continue;

            const username = user.username;
            const total = rows[i]['SUM(times)'];

            output_strings.push(`#${rank} - **${username}** : ${nf.format(total)}`);
          }

          embed.setDescription(output_strings.join('\n'))
            .setFooter(`Page ${nf.format(page + 1)} / ${nf.format(Math.ceil(total_targets / page_length))}`);

          return message.channel.send(embed);
        }
      );
    },
};