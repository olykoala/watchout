const { MessageEmbed }=require('discord.js')
const db=require('quick.db')
const ms=require('ms')

module.exports = {
    name: "slowmode",
    usage: `slowmode <number>`,
    aliases: ["slow", "sm", "slow-mode"],
    category: "Moderation",
    description: "Change the current slowmode of the channel",
    run: async (client, message, args) => {
        let plugin = db.fetch(`plugins_${message.guild.id}-moderation`)
        if(plugin===null) return message.channel.send('Plugin not installed.')
      
         let perms = db.fetch(`perms_${message.guild.id}-15`)
      let perms2 = db.fetch(`perms_${message.guild.id}-25`)
      let perms3 = db.fetch(`perms_${message.guild.id}-50`)
      let perms4 = db.fetch(`perms_${message.guild.id}-75`)
        if (!message.member.roles.cache.has(perms) && !message.member.roles.cache.has(perms2) && !message.member.roles.cache.has(perms3) && !message.member.roles.cache.has(perms4)) return;
      
        const channel=message.mentions.channels.first() || message.channel

       if(!args[0]) return message.channel.send(`<:slowmode:1024703744044179507> Slowmode is currently ${(channel.rateLimitPerUser)} seconds.`)
            if(args=='off') return message.channel.send(`<:slowmode:1024703744044179507> Slowmode has been turned off.`), channel.setRateLimitPerUser('0')
           if(args=='0') return message.channel.send(`<:slowmode:1024703744044179507> Slowmode has been turned off.`), channel.setRateLimitPerUser('0')

            var slowmode=ms(args[0])
            if(!slowmode && args[0]!='0') return message.reply('<:no:1024702761637527682> That time is invalid.')

            channel.setRateLimitPerUser(slowmode)

            var embed=new MessageEmbed()
            .setColor('#FFFFFF')
            .setDescription(`Slowmode has been set to **${ms(slowmode*1000, {long: true})}**`)
            channel.send(`<:slowmode:1024703744044179507> Slowmode has been set to ${ms(slowmode*1000, {long:true})}.`)

      let channelLg = db.fetch(`modlog_${message.guild.id}`)
            if (!channelLg) return;

            var modChannel = message.guild.channels.cache.get(channelLg)
            modChannel.send(`<:slowmode:1024703744044179507> Slowmode has been set to ${ms(slowmode*1000, {long:true})} in ${message.channel}`)

    },
  };
  