const { MessageEmbed }=require('discord.js')
const db=require('quick.db')

module.exports = {
    name: "note",
    category: "Moderation",
    aliases: ["notes"],
    usage: "note list/add/remove <@user>",
    description: "Add/remove a note to someone",
    run: async (client, message, args) => {
      
        let plugin = db.fetch(`plugins_${message.guild.id}-moderation`)
        if(plugin===null) return message.channel.send('Plugin not installed.')
      
         let perms = db.fetch(`perms_${message.guild.id}-15`)
      let perms2 = db.fetch(`perms_${message.guild.id}-25`)
      let perms3 = db.fetch(`perms_${message.guild.id}-50`)
      let perms4 = db.fetch(`perms_${message.guild.id}-75`)
        if (!message.member.roles.cache.has(perms) && !message.member.roles.cache.has(perms2) && !message.member.roles.cache.has(perms3) && !message.member.roles.cache.has(perms4)) return;
        if(!args[0]) return message.reply('Provide an option: `list`, `add`, `remove`')

            if(args[0]==='list') {
            if (!message.member.permissions.has("KICK_MEMBERS")) return;
            var user=!message.member.permissions.has('KICK_MEMBERS') ? message.member : message.mentions.members.first() ? message.mentions.members.first() : message.guild.members.cache.get(args[1]) ? message.guild.members.cache.get(args[1]) : message.member

            var warningsEmbed=new MessageEmbed()
                .setTitle('Notes for '+user.user.tag+'')
                .setColor("#FFFFFF");

            var warnings=db.get(`notes_${user.id}-${message.guild.id}`)
            if(!warnings) return message.reply(`**${user.user.username}** has no notes`)

            var mod=message.member.permissions.has('KICK_MEMBERS')

            for(i=0; i<warnings.length; i++){
                var moderator=mod===true ? 'Added by: <@'+warnings[i].mod+'>' : ''
                warningsEmbed.addField(i+1+'. '+warnings[i].reason, 'Time: '+new Date(warnings[i].time).toUTCString()+'\n'+moderator)
            }

            message.reply({embeds: [warningsEmbed]})
    } else if(args[0] === 'add') {
  var user=message.mentions.members.first() ? message.mentions.members.first() : message.guild.members.cache.get(args[1])
            if(!user) return message.reply("<:quest:1031441183748132925> I looked far and wide but that user is nowhere to be found.")
            
            var reason=args[2] ? args.slice(2).join(' ') : 'Note not provided'
            if(!reason) return message.reply('Provide a note to add.')

var note={
                reason: reason,
                mod: message.author.id,
                time: Date.now()
            }

 var note2=db.get(`notes_${user.id}-${message.guild.id}`)

            if(note2===null){
                db.set(`notes_${user.id}-${message.guild.id}`, [note])
            } else{
                db.push(`notes_${user.id}-${message.guild.id}`, note)
            }

            message.reply(`Note added to **${user.user.username}**`)
} else if(args[0] === 'remove') {
  var user=message.mentions.members.first() ? message.mentions.members.first() : message.guild.members.cache.get(args[1]) 
            if(!user) return message.reply("<:quest:1031441183748132925> I looked far and wide but that user is nowhere to be found.")

            var index=args[2]-1

            var warnings=db.get(`notes_${user.id}-${message.guild.id}`)
            if(!warnings[index]) return message.reply('Provide a note ID\n*Found in the `note list` command*')

            warnings.splice(index, 1)
            db.set(`notes_${user.id}-${message.guild.id}`, warnings)

            message.channel.send(`<:yes:1024702490865844274> **${user.user.username}**'s note with id \`${index+1}\` has been deleted.`)
            }

    },
  };
  