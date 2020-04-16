const { parseMentions } = require('../message-utils.js');
const { DB } = require('../db.js');

module.exports = {
    name: 'banhammer_sentence',
    description: 'One slut to rule them all.',
    this.execute(message, args){
        //Get stuff we need to work with
        const author = message.author;
        const mentions = parseMentions(message);
        const firstMention = mentions[0];
        //Check to make sure we are dealing with Audrey
        if(author.id != '400464877925171201'){
            return message.channel.send(`Only the supreme cumdump may utilize this sacred weapon. You are not worthy.`);
        }
        //Make sure audrey can't ban herself
        if(firstMention.id == '400464877925171201'){
            return message.channel.send(`The supreme cumdump may not ban herself. Even the power of a goddess has it's limits.`);
        }
        //TOOD: Talk to the database
    },
};