const { MessageEmbed }=require('discord.js')
const db=require('quick.db')

module.exports = {
    name: "mute",
    aliases: ["m", "shut"],
    category: "Moderation",
    description: "Remove peoples permissions from talking in chats!",
    run: async (client, message, args) => {
      
        let plugin = db.fetch(`plugins_${message.guild.id}-moderation`)
        if(plugin===null) return message.channel.send('Plugin not installed.')
      
         let perms = db.fetch(`perms_${message.guild.id}-15`)
      let perms2 = db.fetch(`perms_${message.guild.id}-25`)
      let perms3 = db.fetch(`perms_${message.guild.id}-50`)
      let perms4 = db.fetch(`perms_${message.guild.id}-75`)
        if (!message.member.roles.cache.has(perms) && !message.member.roles.cache.has(perms2) && !message.member.roles.cache.has(perms3) && !message.member.roles.cache.has(perms4)) return;

        const user = message.mentions.members.first() ? message.mentions.members.first() : message.guild.members.cache.get(args[0]);
		const time = args[1];
		const reason = args.slice(2).join(" ");
    if (!message.guild.me.permissions.has(Permissions.FLAGS.MODERATE_MEMBERS)) return message.reply({ content: `I do not have correct permissions (moderate members)` });

		if(!user) return message.reply("<:quest:1031441183748132925> I looked far and wide but that user is nowhere to be found.");
     if(user.permissions.has("KICK_MEMBERS")) return message.reply("Due to security reasons, you cannot ban members with the kick members permission.")
		if(!time) return message.reply("Provide a time");
		const m = ms(time);
    // Get from kick command
		 var timeout ={
            reason: `Timeout: ${reason}*${m}`,
            mod: message.member.id,
            time: Date.now()
        }

        var punishments=db.get(`punishments_${user.id}-${message.guild.id}`)

            if(punishments===null){
                db.set(`punishments_${user.id}-${message.guild.id}`, [timeout])
            } else{
                db.push(`punishments_${user.id}-${message.guild.id}`, timeout)
            }

        const embed = new MessageEmbed()
					.setDescription(`${user} has been timeouted`)
        message.channel.send(`<:yes:1024702490865844274> **${user.user.tag}** has been muted.`)
		  try {
        await user.timeout(m,`${reason||"**No Reason**"}`)
			} catch(e) {
				
			}
        let channel = db.fetch(`modlog_${message.guild.id}`)
        if (!channel) return;
        const embedLogs = new MessageEmbed()
            .setTitle(`User Timeouted`)
            .setColor("#FFFFFF")
            .addField("User Punished", `${user} | ${user.tag}`, true)
            .addField("Moderator", `${message.member}`, true)
            .addField("Reason", `${reason || "**No Reason**"}`, true)
            .addField("Date", message.createdAt.toLocaleString(), true)

        var modChannel = message.guild.channels.cache.get(channel)
		 try {
            modChannel.send({embeds: [embedLogs]})
						} catch(e) {
							
						}
    },
  };