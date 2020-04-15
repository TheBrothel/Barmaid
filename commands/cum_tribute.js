module.exports = {
  name: 'cumtribute',
  description: 'Nut.',
  execute(message, args){
    if(!args[0]) return;

    const tribute = message.mentions.members.first();
    const donor = message.author.username;
    if(!member) return;
    //Talk to the server and update the stats
    return message.channel.send('${donor.displayName} tributed one load to ${tribute.displayName}');
  },
};
