const Discord = require('discord.js');
const { execute } = require('./tribute.js');
const tribute = require('./tribute.js');

module.exports = {
    name: 'facesit',
    aliases: [
        'facesitting',
        'smother',
        'smothering'
    ],
    description: 'Tribute facesit alias',
    async execute(message, args) {
        await tribute.execute(message, [...args, "facesit"])
    }
}