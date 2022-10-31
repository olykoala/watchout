const {readdirSync} = require("fs");

// Example of how to make a Help Command

module.exports = {
  name: "help",
  aliases: ["h", "commands"],
  usage: '!help <command>',
  category: "Bot",
  description: "Return all commands, or one specific command!",
  run: async (client, message, args) => {

    let perms = db.fetch(`perms_${message.guild.id}-15`)
      let perms2 = db.fetch(`perms_${message.guild.id}-25`)
      let perms3 = db.fetch(`perms_${message.guild.id}-50`)
      let perms4 = db.fetch(`perms_${message.guild.id}-75`)
        if (!message.member.roles.cache.has(perms) && !message.member.roles.cache.has(perms2) && !message.member.roles.cache.has(perms3) && !message.member.roles.cache.has(perms4)) return;

    if (!message.member.roles.cache.has(perms)) return message.channel.send("**Current Permission Level:** `15`\n\n`cases`, `clear`, `delwarn`, `kick`, `mute`, nick`, `note`, `slowmode`, `warn`, `poll`, `remind`, `userinfo`, `invite`")
    if (!message.member.roles.cache.has(perms2)) return message.channel.send("**Current Permission Level:** `25`\n\n`cases`, `clear`, `delwarn`, `kick`, `ban`, `mute`, nick`, `note`, `slowmode`, `warn`, `poll`, `remind`, `userinfo`, `invite`")
    if (!message.member.roles.cache.has(perms3)) return message.channel.send("**Current Permission Level:** `50`\n\n`cases`, `clear`, `delwarn`, `kick`, `ban`, `lock`, `unlock`, `mute`, nick`, `note`, `slowmode`, `warn`, `poll`, `remind`, `userinfo`, `invite`")
    if (!message.member.roles.cache.has(perms4)) return message.channel.send("**Current Permission Level:** `50`\n\n`cases`, `clear`, `delwarn`, `kick`, `ban`, `lock`, `unlock`, `mute`, nick`, `note`, `slowmode`, `warn`, `poll`, `remind`, `userinfo`, `invite`, `config`")
    
      const command = client.commands.get(args[0].toLowerCase()) || client.commands.find((c) => c.aliases && c.aliases.includes(args[0].toLowerCase()));

      if (!command) {
        message.reply({content: `There isn't any command named "${args[0]}"`});
      } else {

        let command = client.commands.get(args[0].toLowerCase()) || client.commands.find((c) => c.aliases && c.aliases.includes(args[0].toLowerCase()));
        let name = command.name;
        let description = command.description || "No descrpition provided"
        let usage = command.usage || "No usage provided"
        let aliases = command.aliases || "No aliases provided"
        let category = command.category || "No category provided!"
        message.reply(`**${(name.toLocaleString())}**\n\n**Description:** ${description}\n**Usage:** ${usage}\n**Aliases** ${aliases}`);

    }
  },
};
