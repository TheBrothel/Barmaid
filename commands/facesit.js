const Discord = require('discord.js');
const tribute = require('./tribute.js');
const { execute } = require('./tribute.js');
const tribute = require('./tribute.js');

module.exports = {
    name: 'hentai',
    description: 'Tribute facesit alias',
    async execute(message, args) {
        await tribute.execute(message, [...args, "facesit"])
    }
}