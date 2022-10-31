const db=require("quick.db")
module.exports = {
  name: "ping",
  aliases: ["pong", "latency"],
  category: "Utility",
  description: "Check the bot's ping!",
  usage: "ping", 
  run: async (client, message, args) => {
    let plugin = db.fetch(`plugins_${message.guild.id}-utility`)
        if(plugin===null) return message.channel.send('Plugin not installed.')

    let perms = db.fetch(`perms_${message.guild.id}-15`)
      let perms2 = db.fetch(`perms_${message.guild.id}-25`)
      let perms3 = db.fetch(`perms_${message.guild.id}-50`)
      let perms4 = db.fetch(`perms_${message.guild.id}-75`)
        if (!message.member.roles.cache.has(perms) && !message.member.roles.cache.has(perms2) && !message.member.roles.cache.has(perms3) && !message.member.roles.cache.has(perms4)) return;
    const msg = await message.channel.send(`🏓 Pinging...`);

    const pingEmbed = new client.discord.MessageEmbed()
      .addField("Bot", `${Math.floor(msg.createdAt - message.createdAt)}ms`, true)
      .addField("API", `${client.ws.ping}ms`, true)
      .setColor('#FFFFFF')

    await message.reply({embeds: [pingEmbed]});

    msg.delete();
  },
};
