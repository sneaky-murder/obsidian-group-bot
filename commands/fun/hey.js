const discord = require("discord.js");

module.exports.run = async(client, message, arguments, prefix, args) =>{
    if (!message.content.startsWith(prefix)) return;
    let embed = new discord.MessageEmbed()
    .setColor('GREEN')
    .setTitle(`**Hello ${message.author.username}!**, have a nice day!`)
    .setTimestamp()
    .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL());
        return message.channel.send(embed)

}

module.exports.help = {
    name:"hey",
    alt: ["hello", "hi"]
}