const {Client, Collection, Intents} = require('discord.js');
const client = new Client({intents: ["GUILDS","GUILD_MEMBERS","GUILD_BANS","GUILD_INTEGRATIONS","GUILD_WEBHOOKS","GUILD_INVITES","GUILD_VOICE_STATES","GUILD_PRESENCES","GUILD_MESSAGES","GUILD_MESSAGE_REACTIONS","GUILD_MESSAGE_TYPING","DIRECT_MESSAGES","DIRECT_MESSAGE_REACTIONS","DIRECT_MESSAGE_TYPING",],allowedMentions: {repliedUser: false}});
const Discord = require('discord.js');
require('dotenv').config()

module.exports = client;
client.discord = Discord;
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require('./config.json')
require("./handler")(client);

client.login(process.env.TOKEN);