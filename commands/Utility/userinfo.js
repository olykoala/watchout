const {MessageEmbed}=require('discord.js')
const moment = require("moment")
const db=require("quick.db")

module.exports = {
    name: "userinfo",
    aliases: ["ui", "whois"],
    usage: "userinfo @user",
    category: "Utility",
    description: "Check someones profile information",
    run: async (client, message, args) => {
      let plugin = db.fetch(`plugins_${message.guild.id}-utility`)
        if(plugin===null) return message.channel.send('Plugin not installed.')
      
        let inline = true
            
    let member = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;
    
    if (member.user.bot === true) {
        bot = "True";
      } else {
        bot = "False";
      }
    
                let embed = new MessageEmbed()
                    .setColor("#FFFFFF")
                    .addField("Username", `${member.user.tag}`, inline)
                    .addField("User ID", member.user.id, inline)
                    .addField("Nickname", `${member.nickname !== null ? `${member.nickname}` : "None"}`, true)
                    .addField("Bot", `${bot}`,inline, true)
                    .addField("Avatar", `[Download avatar](${member.user.displayAvatarURL({dynamic: true,size: 4096,type: 'png'})})`, inline, true)
                    .addField("Joined Server:", `${moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY")}`, true)
                    .addField("Created Account:", `${moment.utc(member.user.createdAt).format("dddd, MMMM Do YYYY")}`, true)
                    .setThumbnail(`${member.user.displayAvatarURL({dynamic: true,size: 4096,type: 'png'})}`)
                    message.reply({embeds: [embed]})
    },
  };
  
