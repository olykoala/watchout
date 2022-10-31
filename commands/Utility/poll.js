const {MessageEmbed}=require('discord.js')

module.exports = {
    name: "poll",
    category: "Utility",
    description: "Start a poll!",
    usage: "poll <question>",
    run: async (client, message, args) => {
        let plugin = db.fetch(`plugins_${message.guild.id}-utility`)
        if(plugin===null) return message.channel.send('Plugin not installed.')

      let perms = db.fetch(`perms_${message.guild.id}-15`)
      let perms2 = db.fetch(`perms_${message.guild.id}-25`)
      let perms3 = db.fetch(`perms_${message.guild.id}-50`)
      let perms4 = db.fetch(`perms_${message.guild.id}-75`)
        if (!message.member.roles.cache.has(perms) && !message.member.roles.cache.has(perms2) && !message.member.roles.cache.has(perms3) && !message.member.roles.cache.has(perms4)) return;

      
        let reason = args.slice(0).join(" ")
        if(!reason) return message.reply({content: 'Provide a poll title'})
        var embed=new MessageEmbed()
        .setTitle(`Poll`)
        .setDescription(reason)
        .setColor('BLUE')
        const m=await message.channel.send({embeds: [embed]})
        m.react('<:tick:933902728663539743>')
        m.react('<:x_cross:933902715925430332>')
    },
  };
  