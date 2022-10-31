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
 // if(members.size < 2000) return guild.leave()
	
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

var fs = require('fs')
var logger = fs.createWriteStream('logs/message-log.txt', {
  flags: 'a'
})

client.on("messageCreate", async (message) => {
  if(message.author.bot) {
  var writeLine = (line) => logger.write(`\n${line}`);
writeLine(`\n${message.author.tag} (${message.author.id}): ${message.content}`);
  } else {
  var writeLine = (line) => logger.write(`\n${line}`);
    
    if(message. attachments.size>0) return writeLine(`\n${message.author.tag} (${message.author.id}): ${message.content}\nImage Link: ${message.attachments.first().url}\nMessage ID: ${message.id} Channel: ${message.channel.name}`);
    
writeLine(`\n${message.author.tag} (${message.author.id}) BOT: ${message.content}\nMessage ID: ${message.id} Channel: #${message.channel.name}`);
  }
})

client.on("messageUpdate", async (message, oldMessage, newMessage) => {
  if (!oldMessage.author) return;
  if (oldMessage.author.bot) return;
  var writeLine = (line) => logger.write(`\n${line}`);
  
    if(message. attachments.size>0) return writeLine(`\nMESSAGE EDIT\n${message.author.tag} (${message.author.id})\nBEFORE: ${message.content}\nNOW: ${oldMessage}\nImage Link: ${message.attachments.first().url}\nMessage ID: ${message.id} Channel: #${message.channel.name}`);
  
writeLine(`\nMESSAGE EDIT\n${message.author.tag} (${message.author.id})\nBEFORE: ${message.content}\nNOW: ${oldMessage}\nMessage ID: ${message.id} Channel: #${message.channel.name}`);
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

client.on("messageCreate", async (message) => {
  var logger3 = fs.createWriteStream(`logs/user-messages/${message.author.id}`, {
  flags: 'a'
})
  var writeLine = (line) => logger3.write(`\n${line}`);
  if(message. attachments.size>0) return writeLine(`\n${message.author.tag} (${message.author.id}): ${message.content}\nImage Link: ${message.attachments.first().url}\nMessage ID: ${message.id} Channel: #${message.channel.name}`);
writeLine(`\n${message.author.tag} (${message.author.id}): ${message.content}\nMessage ID: ${message.id} Channel: #${message.channel.name}`);
  })

client.on("messageUpdate", async (message, oldMessage, newMessage) => {
    var logger3 = fs.createWriteStream(`logs/user-messages/${message.author.id}`, {
  flags: 'a'
})
  if (!oldMessage.author) return;
  if (oldMessage.author.bot) return;
  var writeLine = (line) => logger3.write(`\n${line}`);
  
    if(message. attachments.size>0) return writeLine(`\nMESSAGE EDIT\n${message.author.tag} (${message.author.id})\nBEFORE: ${message.content}\nNOW: ${oldMessage}\nImage Link: ${message.attachments.first().url}\nMessage ID: ${message.id} Channel: ${message.channel.name}`);
  
writeLine(`\nMESSAGE EDIT\n${message.author.tag} (${message.author.id})\nBEFORE: ${message.content}\nNOW: ${oldMessage}\nMessage ID: ${message.id} Channel: #${message.channel.name}`);
})

client.on("guildMemberAdd", async member => {
  var welchannel = client.channels.cache.get(`1023825167492857887`)

  welchannel.send(`Welcome to the server ${member}!`)
});