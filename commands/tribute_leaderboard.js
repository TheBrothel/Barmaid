const { parseMentions } = require('../message-utils.js');
const { DB } = require('../db.js');

module.exports = {
    name: 'tribute_leaderboard',
    description: 'Whos the sluttiest of them all?',
    execute(message, args){
      //TODO: Add the fucking command lmao
      return message.channel.send('This is a stub for the tribute_leaderboard command.')  
    },
};