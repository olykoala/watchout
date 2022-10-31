const {MessageEmbed}=require('discord.js')
const db = require("quick.db")

module.exports = {
    name: "eval",
    aliases: ["ev"],
    category: "Developer",
    description: "Evaluate some code",
    usage: "eval <.js code>", 
    run: async (client, message, args) => {
        if (message.author.id != '529995365714231327') return;
        
        var msg = message
              const test = [
                `I'm working!`
              ]
              let evaled;
              try {
                evaled = await eval(args.join(' '));
                const successEmbed=new MessageEmbed()
                .addField("📥 Input", `\`\`\`${args.join(' ')}\`\`\``)
                .setTitle('Evalucation')
                  .addField(`📤 Output`, `\`\`\`${(evaled)}\`\`\``)
                  .addField(`✅ Status`, `\`\`\`ini\n[Success]\n\`\`\``)
                  .setColor('#00FF0D')
                message.channel.send({embeds: [successEmbed]})
              } catch (error) {
                const errorEmbed = new MessageEmbed()
                .setTitle('Evalucation')
                .addField("📥 Input", `\`\`\`${args.join(' ')}\`\`\``)
                  .addField('📤 Output', '```js\n'+error+'\n```')
                  .addField('❌ Status', '```css\n[Failed]\n```')
                  .setColor('#FF0000')
        
                message.channel.send({embeds: [errorEmbed]});
              }
    },
  };
  