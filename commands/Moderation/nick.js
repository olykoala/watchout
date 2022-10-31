const { MessageEmbed }=require('discord.js')
const db=require('quick.db')

module.exports = {
    name: "nick",
    category: "Moderation",
    aliases: ["nickname"],
    usage: "nick <@user> <new nickname>",
    description: "Change someones nickname",
    run: async (client, message, args) => {

      let plugin = db.fetch(`plugins_${message.guild.id}-moderation`)
        if(plugin===null) return message.channel.send('Plugin not installed.')
      
         let perms = db.fetch(`perms_${message.guild.id}-15`)
      let perms2 = db.fetch(`perms_${message.guild.id}-25`)
      let perms3 = db.fetch(`perms_${message.guild.id}-50`)
      let perms4 = db.fetch(`perms_${message.guild.id}-75`)
        if (!message.member.roles.cache.has(perms) && !message.member.roles.cache.has(perms2) && !message.member.roles.cache.has(perms3) && !message.member.roles.cache.has(perms4)) return;

        var user=message.mentions.members.first() ? message.mentions.members.first() : message.guild.members.cache.get(args[0])
            if(!user) return message.reply("<:quest:1031441183748132925> I looked far and wide but that user is nowhere to be found.")

            try{
                await user.setNickname(args.slice(1).join(' '))
                var embed=new MessageEmbed()
                .setColor('#FFFFFF')
                .setDescription(`${user}'s nickname has been changed to ${args.slice(1).join(' ')}`)
                message.channel.send()
            } catch (error){
                return message.reply('There was an error')
            }

    },
  };
  