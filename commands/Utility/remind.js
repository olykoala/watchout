const {MessageEmbed}=require('discord.js')
const db = require("quick.db")
const ms=require('ms')

module.exports = {
    name: "remind",
    aliases: ["rmd", "timer"],
    category: "Utility",
    usage: "remind <time> <reminder>",
    description: "Set yourself a reminder!",
    run: async (client, message, args) => {
      let plugin = db.fetch(`plugins_${message.guild.id}-utility`)
        if(plugin===null) return message.channel.send('Plugin not installed.')
      let perms = db.fetch(`perms_${message.guild.id}-15`)
      let perms2 = db.fetch(`perms_${message.guild.id}-25`)
      let perms3 = db.fetch(`perms_${message.guild.id}-50`)
      let perms4 = db.fetch(`perms_${message.guild.id}-75`)
        if (!message.member.roles.cache.has(perms) && !message.member.roles.cache.has(perms2) && !message.member.roles.cache.has(perms3) && !message.member.roles.cache.has(perms4)) return;
      
        let timeuser = args[0]
        let reason = args.slice(1).join(" ")
        // !remind 10m Dream Code Uploaded video
        
        if(!timeuser) return message.reply("Enter a time")
        if(!reason) return message.reply("Enter the reason")
        
        db.set(`remind.${message.author.id}`,Date.now() + ms(timeuser))
        var embed=new MessageEmbed()
        .setColor('#FFFFFF')
        .setDescription(`🔔 Reminder set! **${reason}**.\nYou will be reminded in ${timeuser}`)
        message.reply({embeds: [embed]})
        const interval = setInterval(function() {
        
        
            if(Date.now() > db.fetch(`remind.${message.author.id}`)){
                db.delete(`remind.${message.author.id}`)
                var dm=new MessageEmbed()
                .setTitle('Reminder Alert')
                .setURL('https://discordapp.com/channels/'+message.guild.id+'/'+message.channel.id+'/'+message.id+'')
                .setColor('#FFFFFF')
                .setDescription(`${timeuser} ago you asked me to remind you!`)
                 var dm2=new MessageEmbed()
                .setColor('#FFFFFF')
                .setDescription(reason)
                message.author.send({embeds: [dm, dm2]})
                .catch(e => console.log(e))
                clearInterval(interval)
            }
        
        },1000)
    },
  };
  