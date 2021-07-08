const Discord = require('discord.js');
const { execute } = require('./tribute.js');
const tribute = require('./tribute.js');

module.exports = {
    name: 'hentai',
    description: 'Tribute facesit alias',
    async execute(message, args) {
        new tribute(message, "facesit")
    }
}