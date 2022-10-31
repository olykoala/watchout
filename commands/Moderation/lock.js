const { MessageEmbed }=require('discord.js')
const db=require('quick.db')

module.exports = {
    name: "lock",
    aliases: ["lockit", "lockdown"],
    category: "Moderation",
    description: "Lock a text channel",
    usage: "lock <reason>", 
    run: async (client, message, args) => {
        let plugin = db.fetch(`plugins_${message.guild.id}-moderation`)
        if(plugin===null) return message.channel.send('Plugin not installed.')
      
      let perms3 = db.fetch(`perms_${message.guild.id}-50`)
      let perms4 = db.fetch(`perms_${message.guild.id}-75`)
        if (!message.member.roles.cache.has(perms3) && !message.member.roles.cache.has(perms4)) return;
      
        const reason = args.slice().join(' ') ? args.join(' ') : 'unknown'

        message.channel.permissionOverwrites.edit(message.channel.guild.roles.everyone, { SEND_MESSAGES: false });
        message.channel.send(`<:locked:1031440165694083073> This channel has been locked.`)

        let channel = db.fetch(`modlog_${message.guild.id}`)
                    if (!channel) return;
                    modChannel.send(`<:locked:1031440165694083073> ${message.channel} has been locked by **${message.author.tag}**.`)
    },
  };
  