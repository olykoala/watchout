const { MessageEmbed }=require('discord.js')
const db=require('quick.db')

module.exports = {
    name: "warn",
    aliases: ["w", "strike"],
    category: "Moderation",
    usage: "warn <@user> <reason>",
    description: "Warn someone for breaking a rule",
    run: async (client, message, args) => {
      let plugin = db.fetch(`plugins_${message.guild.id}-moderation`)
        if(plugin===null) return message.channel.send('Plugin not installed.')
      
         let perms = db.fetch(`perms_${message.guild.id}-15`)
      let perms2 = db.fetch(`perms_${message.guild.id}-25`)
      let perms3 = db.fetch(`perms_${message.guild.id}-50`)
      let perms4 = db.fetch(`perms_${message.guild.id}-75`)
        if (!message.member.roles.cache.has(perms) && !message.member.roles.cache.has(perms2) && !message.member.roles.cache.has(perms3) && !message.member.roles.cache.has(perms4)) return;

            var user=message.mentions.members.first() ? message.mentions.members.first() : message.guild.members.cache.get(args[0])
            if(!user) return message.reply("That is not a user!")
            
            var reason=args[1] ? args.slice(1).join(' ') : 'unknown'

            var warn2={
                reason: `Warning: ${reason}`,
                mod: message.author.id,
                time: Date.now()
            }

            var punishments=db.get(`punishments_${user.id}-${message.guild.id}`)

            if(punishments===null){
                db.set(`punishments_${user.id}-${message.guild.id}`, [warn2])
            } else{
                db.push(`punishments_${user.id}-${message.guild.id}`, warn2)
            }

          

            try{
                await user.send(`<:warning:1024703068857704480> You have been warned in Flintch for ${reason}. (Case \`#${num}\`)`)
            } catch{}

            message.channel.send(`<:warning:1024703068857704480> Warned **${user.user.tag}** (Case \`#${num}\`)`)

            
            
            message.delete()

            let channel = db.fetch(`modlog_${message.guild.id}`)
            if (!channel) return;

            var modChannel = message.guild.channels.cache.get(channel)
            modChannel.send(`<:warning:1024703068857704480> **${user.user.tag}** (\`${user.user.id}\`) has been warned by **${message.author.tag}**. (Case \`#${num}\`)\n\n<:note:1024704335067762760> ${reason}`)

    },
  };
  