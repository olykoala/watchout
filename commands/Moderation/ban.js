const { MessageEmbed }=require('discord.js')
const db=require('quick.db')

module.exports = {
    name: "ban",
    aliases: ["b"],
    category: "Moderation",
    description: "Ban someone from the server",
    usage: "ban <@user> <reason>", 
    run: async (client, message, args) => {
       let plugin = db.fetch(`plugins_${message.guild.id}-moderation`)
        if(plugin===null) return message.channel.send('Plugin not installed.')
      
      let perms2 = db.fetch(`perms_${message.guild.id}-25`)
      let perms3 = db.fetch(`perms_${message.guild.id}-50`)
      let perms4 = db.fetch(`perms_${message.guild.id}-75`)
        if (!message.member.roles.cache.has(perms2) && !message.member.roles.cache.has(perms3) && !message.member.roles.cache.has(perms4)) return;
      
        var user=message.mentions.members.first() ? message.mentions.members.first() : message.guild.members.cache.get(args[0])
            if(!user) return message.reply("<:quest:1031441183748132925> I looked far and wide but that user is nowhere to be found!")
      if(user.permissions.has("KICK_MEMBERS")) return message.reply("Due to security reasons, you cannot ban members with the kick members permission.")
            var reason=args[1] ? args.slice(1).join(' ') : 'unknown'

            var ban={
                reason: `Ban: ${reason}`,
                mod: message.author.id,
                time: Date.now()
            }
    
            var punishments=db.get(`punishments_${user.id}-${message.guild.id}`)
    
                if(punishments===null){
                    db.set(`punishments_${user.id}-${message.guild.id}`, [ban])
                } else{
                    db.push(`punishments_${user.id}-${message.guild.id}`, ban)
                }
            try{
              await user.send(`<:ban:1031439980020633703> You have been banned from ${message.guild.name} for ${reason}.`)
              user.ban()
            } catch{}

            message.channel.send(`<:ban:1031439980020633703> **${user.user.tag}** has been banned.`)
            message.delete()

        let channel = db.fetch(`modlog_${message.guild.id}`)
            if (!channel) return;
            var modChannel = message.guild.channels.cache.get(channel)
            modChannel.send(`<:ban:1031439980020633703> **${user.user.tag}** (\`${user.user.id}\`) has been banned by **${message.author.tag}**.\n\n<:note:1031440086144917574> ${reason}`)
    },
  };
  