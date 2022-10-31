const { MessageEmbed }=require('discord.js')
const db=require('quick.db')

module.exports = {
    name: "config",
    category: "Moderation",
    usage: "config <channel name/ID>",
    description: "Set the mod log channel for logging when a mod uses a moderation command.",
    run: async (client, message, args) => {
      
        if (!message.member.permissions.has("MANAGE_GUILD")) return;

      if(!args[0]) message.channel.send('Config options:\npermissions, plugins')

if(args[0]=='permissions') {
  
  if(!args[1]) return message.channel.send('**Example:**\n`!config permissions 25 @Moderator`\n\n**Level Meanings:**\n15: Usually trainee moderator, can use commands such as clear, kick, mute, nick, note, slowmode & warn\n25: Pretty much the same as lvl. 15 but can use the ban command\n50: Same as lvl. 25 but can use commands such as lock & unlock.\n75: Can use all commands.')

  if(args[1] > 76) return message.channel.send("You cannot config over 75 (admin)")
  if(args[1] < 14) return message.channel.send("You cannot config under 25")
  if(args[1]=='15') {
    var role=message.mentions.roles.first().id
    db.set(`perms_${message.guild.id}-15`, `${role}`)
    message.channel.send(`<:yes:1024702490865844274> Role ${role} has been set to level 15`)
  } else if(args[1]=='25') {
    var role=message.mentions.roles.first().id
    db.set(`perms_${message.guild.id}-25`, `${role}`)
    message.channel.send(`<:yes:1024702490865844274> Role ${role} has been set to level 25`)
  } else if(args[1]=='50') {
    var role=message.mentions.roles.first().id
    db.set(`perms_${message.guild.id}-50`, `${role}`)
    message.channel.send(`<:yes:1024702490865844274> Role ${role} has been set to level 50`)
  } else if(args[1]=='75') {
    var role=message.mentions.roles.first().id
    db.set(`perms_${message.guild.id}-75`, `${role}`)
    message.channel.send(`<:yes:1024702490865844274> Role ${role} has been set to level 75`)
  }
  
} else if(args[0]=='plugins') {
  if(!args[1]) return message.channel.send('**Example:**\n`!config plugins install moderation`\n`!config plugins remove moderation`\n\n**Available Plugins:** `moderation`, `utility`, `message-logs`, `mod-logs`')
  if(args[1]=='install') {
    
  if(args[2]=='moderation') {
    db.set(`plugins_${message.guild.id}-moderation`, true)
    message.channel.send(`<:yes:1024702490865844274> Plugin \`moderation\` has been installed.`)
    
  } else if(args[2]=='utility') {
    db.set(`plugins_${message.guild.id}-utility`, true)
    message.channel.send(`<:yes:1024702490865844274> Plugin \`utility\` has been installed.`)
  } else if(args[2]=='message-logs') {
      if(!args[3]) return message.channel.send('**Example:**\n`!config plugins install message-logs [channel-ID]`')
              let channel = message.mentions.channels.first() || client.guilds.cache.get(message.guild.id).channels.cache.get(args[3]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.join(' ').toLocaleLowerCase());
      
                      client.guilds.cache.get(message.guild.id).channels.cache.get(channel.id).send("<:join:1031439824361639976> This channel will now log when a message is deleted/updated.")
                      db.set(`msglogs_${message.guild.id}`, channel.id)
      
                      message.reply(`<:yes:1024702490865844274> Plugin \`message-logs\` has been installed | \`${channel.name}\``)

  } else if(args[2]=='mod-logs') {
              let channel = message.mentions.channels.first() || client.guilds.cache.get(message.guild.id).channels.cache.get(args[3]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.join(' ').toLocaleLowerCase());
      
                      client.guilds.cache.get(message.guild.id).channels.cache.get(channel.id).send("<:join:1031439824361639976> This channel will now log when a moderation action is declared.")
                      db.set(`modlog_${message.guild.id}`, channel.id)
      
                      message.reply(`<:yes:1024702490865844274> Plugin \`mod-logs\` has been installed | \`${channel.name}\``)
  } 
} else if(args[1]=='remove') {
  if(args[2]=='moderation') {
    db.set(`plugins_${message.guild.id}-moderation`, null)
    message.channel.send(`<:yes:1024702490865844274> Plugin \`moderation\` has been uninstalled.`)
    
  } else if(args[2]=='utility') {
    db.set(`plugins_${message.guild.id}-utility`, null)
    message.channel.send(`<:yes:1024702490865844274> Plugin \`utility\` has been uninstalled.`)
    
  } else if(args[2]=='message-logs') {
                      db.delete(`msglogs_${message.guild.id}`, channel.id)
                      message.reply(`<:yes:1024702490865844274> Plugin \`message-logs\` has been uninstalled`)

  } else if(args[2]=='mod-logs') {
                      db.delete(`modlog_${message.guild.id}`, channel.id)
                      message.reply(`<:yes:1024702490865844274> Plugin \`mod-logs\` has been uninstalled`)
  } 
}
}

    },
  };
  