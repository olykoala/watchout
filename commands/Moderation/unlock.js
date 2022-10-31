const { MessageEmbed }=require('discord.js')
const db=require('quick.db')

module.exports = {
    name: "unlock",
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
        
        var embed=new MessageEmbed()
        .setTitle('Chnanel Locked')
        .setDescription(`<#${message.channel.id}> has been unlocked by <@${message.author.id}>`)
        .addField('Reason', reason, true)
        .setColor('#FFFFFF')
        message.channel.permissionOverwrites.create(message.channel.guild.roles.everyone, { SEND_MESSAGES: true });
        message.channel.send({embeds: [embed]})
        
        let channel = db.fetch(`modlog_${message.guild.id}`)
                    if (!channel) return;
        
                    const embedMod = new MessageEmbed()
                        .setTitle('Channel Unlocked')
                        .setColor("#FFFFFF")
                        .addField("Channel", `<#${message.channel.id}>`, true)
                        .addField("Mod", `<@${message.author.id}>`, true)
                        .addField("Date", message.createdAt.toLocaleString(), true)
        
                    var modChannel = message.guild.channels.cache.get(channel)
                    modChannel.send({embeds: [embedMod]})
    },
  };
  