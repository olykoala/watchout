const {MessageEmbed}=require('discord.js')
const db = require("quick.db")
const ms=require('ms')

module.exports = {
    name: "invite",
    aliases: ["inv", "links", 'link', 'credits'],
    category: "Utility",
    description: "Invite Watchout to your server(s)",
    run: async (client, message, args) => {
      
       var embed=new MessageEmbed()
       .setTitle(`Invite Watchout`)
       .setColor('#FFFFFF')
       .setDescription('[Click here](https://discord.com/api/oauth2/authorize?client_id=930079200428318730&permissions=8&redirect_uri=https%3A%2F%2Fdiscord.gg%2FXSrrWTEr3A&response_type=code&scope=bot%20applications.commands%20identify) to invite Watchout to your server. Note a requirement of at least 2K members is required for Watchout to be used inside your server.')
       message.reply({embeds: [embed]})
    },
  };
  