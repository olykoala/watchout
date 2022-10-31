const { MessageEmbed }=require('discord.js')
const db=require('quick.db')

module.exports = {
    name: "cases",
    usage: `cases <@user>`,
    aliases: ["punishments", "warnings"],
    category: "Moderation",
    description: "View all of someones cases even if its been deleted! Warns, mutes, kicks & bans.",
    run: async (client, message, args) => {

      let plugin = db.fetch(`plugins_${message.guild.id}-moderation`)
        if(plugin===null) return message.channel.send('Plugin not installed.')
      
         let perms = db.fetch(`perms_${message.guild.id}-15`)
      let perms2 = db.fetch(`perms_${message.guild.id}-25`)
      let perms3 = db.fetch(`perms_${message.guild.id}-50`)
      let perms4 = db.fetch(`perms_${message.guild.id}-75`)
      
        var user=!message.member.roles.cache.has(perms) && !message.member.roles.cache.has(perms2) && !message.member.roles.cache.has(perms3) && !message.member.roles.cache.has(perms4) ? message.member : message.mentions.members.first() ? message.mentions.members.first() : message.guild.members.cache.get(args[0]) ? message.guild.members.cache.get(args[0]) : message.member

            var warningsEmbed=new MessageEmbed()
                .setTitle('Cases for '+user.user.tag+'')
                .setColor("#FFFFFF");

            var warnings=db.get(`punishments_${user.id}-${message.guild.id}`)
            if(!warnings) return message.reply(`**${user.user.username}** has no cases`)

            var mod=message.member.permissions.has('KICK_MEMBERS')

            for(i=0; i<warnings.length; i++){
                var moderator=mod===true ? 'Moderator: <@'+warnings[i].mod+'>' : ''
                warningsEmbed.addField(i+1+'. '+warnings[i].reason, 'Time: '+new Date(warnings[i].time).toUTCString()+'\n'+moderator)
            }

            message.reply({embeds: [warningsEmbed]})

    },
  };
  