const {MessageEmbed}=require('discord.js')
const db = require("quick.db")

module.exports = {
    name: "reload",
    category: "Developer",
    description: "Reload a command",
    usage: "reload <file> <command>", 
    run: async (client, message, args) => {
        if (message.author.id != '529995365714231327') return;
        let cmdfolder = args[0];
        if(!cmdfolder) return message.channel.send('Provide a command Folder')
        let command = args[1];
        if (!command) return message.channel.send('Provide a command')
        try{
               require(`../${cmdfolder}/${command}`) 
        } catch(e) {
            return message.channel.send('No command with that name found.') 
        }
        delete require.cache[require.resolve(`../${cmdfolder}/${command}`)];
        let pull = require(`../${cmdfolder}/${command}`);
        return message.channel.send(`The command \`${command}\` has been reloaded.`)
    },
  };
  