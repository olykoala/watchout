const { MessageEmbed }=require('discord.js')
const db=require('quick.db')

module.exports = {
    name: "clear",
    aliases: ["purge", "prune"],
    category: "Moderation",
    usage: "clear <number>",
    description: "Warn someone for breaking a rule",
    run: async (client, message, args) => {
      
        let plugin = db.fetch(`plugins_${message.guild.id}-moderation`)
        if(plugin===null) return message.channel.send('Plugin not installed.')
      
         let perms = db.fetch(`perms_${message.guild.id}-15`)
      let perms2 = db.fetch(`perms_${message.guild.id}-25`)
      let perms3 = db.fetch(`perms_${message.guild.id}-50`)
      let perms4 = db.fetch(`perms_${message.guild.id}-75`)
        if (!message.member.roles.cache.has(perms) && !message.member.roles.cache.has(perms2) && !message.member.roles.cache.has(perms3) && !message.member.roles.cache.has(perms4)) return;

        if(!+args[0]) return message.channel.send('<:warn:1031439922906804277> That is not a number.')
        if(+args[0]>100 || +args[0]<0) return message.channel.send("<:warn:1031439922906804277> You can only clear 0-100 messages")
        try{
            message.channel.bulkDelete(args[0])
            var bdMsg=await message.channel.send(`<:bin:1031440232912011294> ${args[0]} messages have been deleted.`)

            setTimeout(() => {
                bdMsg.delete()
            }, 5000);
        } catch (error){
            message.reply("There was an error clearing messages.")

            client.channels.cache.get('927087201269985320').send(error)
        }

    },
  };
  