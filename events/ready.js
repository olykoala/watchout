const client = require("../index");
const { MessageEmbed }=require('discord.js')
const { time } = require('@discordjs/builders')

client.once("ready", (message) => {
  console.log(`${client.user.username} is now online!`)
})