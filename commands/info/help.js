const discord = require("discord.js");

module.exports.run = async(client, message, arguments, prefix, args) =>{
    if (!message.content.startsWith(prefix)) return;

    var userCommand = message.guild.emojis.cache.find(
        (emoji) => emoji.name === "online"
      );
      var modCommand = message.guild.emojis.cache.find(
        (emoji) => emoji.name === "alert"
      );
      //General help menue
        if(!args[1]){ 
            let embed = new discord.MessageEmbed()
            .setColor('#66CCFF')
            .setTitle('HELP MENUE')
            .setDescription(`**Notes:**\n**-** ${userCommand} this means the command is ment for a member.\n**-** ${modCommand} this means the command is ment for a mod.\n**-** {...} is a needed element to execute the command.\n**-** [...] is the needed permision to execute the command.\n**-** (...) is an optional element.\n**-** |...| is addidtional information.`)
            .addField('Categorys:', '`info` `moderation` `fun`')
            .setTimestamp()
            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL());
            return message.channel.send(embed)
        }else if(args[1] === "info" || args[1] === "information"){
            let embed = new discord.MessageEmbed()
            .setColor('#66CCFF')
            .setTitle('INFO COMMANDS')
            .setDescription(`**Notes:**\n**-** ${userCommand} this means the command is ment for a member.\n**-** ${modCommand} this means the command is ment for a mod.\n**-** {...} is a needed element to execute the command.\n**-** [...] is the needed permision to execute the command.\n**-** (...) is an optional element.\n**-** |...| is addidtional information.`)
            .addField(`${userCommand}${'`$help (category)`'}`, "**-** [SEND_MESSAGES] |alt: `$commands`, `$menue`|")
            .setTimestamp()
            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL());
            return message.channel.send(embed)
        }else if(args[1] === "moderation"){
            let embed = new discord.MessageEmbed()
            .setColor('#66CCFF')
            .setTitle('MODERATION COMMANDS')
            .setDescription(`**Notes:**\n**-** ${userCommand} this means the command is ment for a member.\n**-** ${modCommand} this means the command is ment for a mod.\n**-** {...} is a needed element to execute the command.\n**-** [...] is the needed permision to execute the command.\n**-** (...) is an optional element.\n**-** |...| is addidtional information.`)
            .addField(`${modCommand}${"`$kick <user> <reason>`"}`, "**-** [KICK_MESSAGES] |alt: `$remove`|")
            .addField(`${modCommand}${"`$ban <user> <reason>`"}`, "**-** [BAN_MESSAGES] |alt: `$yeet`|")
            .setTimestamp()
            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL());
            return message.channel.send(embed)
        }else if(args[1] === "fun"){
            let embed = new discord.MessageEmbed()
            .setColor('#66CCFF')
            .setTitle('FUN COMMANDS')
            .setDescription(`**Notes:**\n**-** ${userCommand} this means the command is ment for a member.\n**-** ${modCommand} this means the command is ment for a mod.\n**-** {...} is a needed element to execute the command.\n**-** [...] is the needed permision to execute the command.\n**-** (...) is an optional element.\n**-** |...| is addidtional information.`)
            .addField(`${userCommand}${'`$hey`'}`, "**-** [SEND_MESSAGES] |alt: `$hello`, `$hi`|")
            .setTimestamp()
            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL());
            return message.channel.send(embed)

        }else{
            let embed = new discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Not found!')
            .setDescription('Sorry but this category is not found.')
            .addField('Categorys:', "`info` `moderation` `fun`")
            .setTimestamp()
            .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL());
            return message.channel.send(embed)
        }





}

module.exports.help = {
    name:"help",
    alt: ["menue", "commands"]
}