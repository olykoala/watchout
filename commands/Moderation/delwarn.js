const { MessageEmbed }=require('discord.js')
const db=require('quick.db')

module.exports = {
    name: "delwarn",
    aliases: ["rmwarn", "delstrike", "rmstrike"],
    category: "Moderation",
    description: "Delete a warning from someone",
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

        var index=args[1]-1

        var warnings=db.get(`warnings_${user.id}-${message.guild.id}`)
        if(!warnings[index]) return message.reply('That warnings does not exist.\nFind a warning ID in the `warnings` command.')

        warnings.splice(index, 1)
        db.set(`warnings_${user.id}-${message.guild.id}`, warnings)

        var warnEmbed=new MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`${user}'s warning with ID ${index+1} has been deleted.`)
        message.reply(`<:yep:1031439861095333900> Warning \`#${index+1}\` has been deleted for **${user.user.tag}**`)  
         
    },
  };
  