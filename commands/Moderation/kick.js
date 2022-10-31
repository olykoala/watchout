const { MessageEmbed }=require('discord.js')
const db=require('quick.db')

module.exports = {
    name: "kick",
    aliases: ["k"],
    category: "Moderation",
    description: "Kick someone from the server",
    usage: "kick <@user> <reason>", 
    run: async (client, message, args) => {
        let plugin = db.fetch(`plugins_${message.guild.id}-moderation`)
        if(plugin===null) return message.channel.send('Plugin not installed.')
      
         let perms = db.fetch(`perms_${message.guild.id}-15`)
      let perms2 = db.fetch(`perms_${message.guild.id}-25`)
      let perms3 = db.fetch(`perms_${message.guild.id}-50`)
      let perms4 = db.fetch(`perms_${message.guild.id}-75`)
        if (!message.member.roles.cache.has(perms) && !message.member.roles.cache.has(perms2) && !message.member.roles.cache.has(perms3) && !message.member.roles.cache.has(perms4)) return;
      
        if(!user) return message.reply("<:quest:1031441183748132925> I looked far and wide but that user is nowhere to be found.")
            var reason=args.slice(1).join(' ') ? args.join(' ') : 'unknown'
      if(user.permissions.has("KICK_MEMBERS")) return message.reply("Due to security reasons, you cannot ban members with the kick members permission.")

            var kick={
                reason: `Kick: ${reason}`,
                mod: message.author.id,
                time: Date.now()
            }
    
            var punishments=db.get(`punishments_${user.id}-${message.guild.id}`)
    
                if(punishments===null){
                    db.set(`punishments_${user.id}-${message.guild.id}`, [kick])
                } else{
                    db.push(`punishments_${user.id}-${message.guild.id}`, kick)
                }

                
            try{
                await user.send(`<:kick:1031440015747731456> You have been kicked from ${message.guild.name} for ${reason}.`)
              user.kick()
            } catch{}

            message.channel.send(`<:kick:1031440015747731456> **${user.user.tag}** has been kicked.`)
            message.delete()

        let channel = db.fetch(`modlog_${message.guild.id}`)
            if (!channel) return;

            var modChannel = message.guild.channels.cache.get(channel)
            modChannel.send(`<:kick:1031440015747731456> **${user.user.tag}** (\`${user.user.id}\`) has been kicked by **${message.author.tag}**.\n\n<:note:1031440086144917574> ${reason}`)
    },
  };
  