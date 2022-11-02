const client = require("../index");
const db=require('quick.db')
const { MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require("discord.js");

client.on("messageCreate", async (message) => {
    if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(client.config.botPrefix))
    return;

    const [cmd, ...args] = message.content.slice(client.config.botPrefix.length).trim().split(" ");
    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;
    await command.run(client, message, args);
});

client.on('guildCreate', async guild => {
  const members = guild.members.cache.filter(member => !member.user.bot);
const bots = guild.members.cache.filter(member => member.user.bot);
  if(members.size < 2000) return guild.leave()
	
})

client.on("messageDelete", async (message) => {
   if(message.author.bot) return;
  let channel = db.fetch(`msglogs_${message.guild.id}`)
            if (!channel) return;
            var modChannel = message.guild.channels.cache.get(channel)
			      if(!modChannel) return;

   const row = new MessageActionRow()
	.addComponents(
    new MessageButton()
    .setLabel("Message Deleted")
    .setStyle("SECONDARY")
    .setDisabled(true)
    .setCustomId("delbutton"),
);
   
  modChannel.send({content: `**${message.author.tag}:** (\`${message.id}\`) ${message.content}\nMessage ID: ${message.id} Channel: ${message.channel}`, components: [row]})
     })

client.on("messageUpdate", async (message, oldMessage, newMessage) => {
  if (!oldMessage.author) return;
  if (oldMessage.author.bot) return;
     if(message.author.bot) return;
  
  let channel = db.fetch(`msglogs_${message.guild.id}`)
            if (!channel) return;
            var modChannel = message.guild.channels.cache.get(channel)
			      if(!modChannel) return;

   const row = new MessageActionRow()
	.addComponents(
    new MessageButton()
    .setLabel("Message Update")
    .setStyle("SECONDARY")
    .setDisabled(true)
    .setCustomId("delbutton"),
);
   
  modChannel.send({content: `**${message.author.tag}** (\`${message.author.id}\`)\nBEFORE: ${message.content}\nNOW: ${oldMessage}\nMessage ID: ${message.id} Channel: ${message.channel}`, components: [row]})
})


client.on("guildMemberAdd", async member => {
  var welchannel = client.channels.cache.get(`1023825167492857887`)

  welchannel.send(`Welcome to the server ${member}!`)
});
