const Discord = require('discord.js');
const { execute } = require('./tribute.js');
const tribute = require('./tribute.js');

module.exports = {
    name: 'blowjob',
    aliases: [
        'bj',
        'beej',
        'suck',
        'swallow',
        'lick'
    ],
    'examples': ['$bj @someone', '$suck @someone', '$lick @someone'],
    description: 'Tribute facesit alias',
    async execute(message, args) {
        await tribute.execute(message, [...args, "bj"])
    }
}