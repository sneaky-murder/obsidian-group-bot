const discord = require("discord.js");
const client = new discord.Client();

module.exports.run = async(client, message, arguments, prefix, args) =>{
        
        //errorEmbed
        let errorEmbed = new discord.MessageEmbed()
        .setColor('#ff0000')
        .setTimestamp()
        .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL());

        var args = message.content.slice(prefix.length).split(/ +/);

        errorEmbed.setTitle('No Permission!')
        errorEmbed.setDescription("Sorry but it seems like you're missing permission to execute this command.")

        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(errorEmbed);

        errorEmbed.setTitle('No Permission!')
        errorEmbed.setDescription("Sorry but I can't execute this command it seems like I don't have the `KICK_MEMBERS` permission.\nPleas contact staff.")
    
        if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send(errorEmbed);

        errorEmbed.setTitle('No User!')
        errorEmbed.setDescription("Sorry but you didn't give a user to kick.")
    
        if(!args[1]) return message.channel.send(errorEmbed);

        errorEmbed.setTitle('No Reason!')
        errorEmbed.setDescription(`Pleas give a reason to kick ${args[1]}.`)
    
        if(!args[2]) return message.channel.send(errorEmbed);
        errorEmbed.setTitle('Invalid user')
        errorEmbed.setDescription("It seems like this isn't a mention or a id of a use in the server.")
    
        let kickUser = message.mentions.users.first() || client.users.cache.get(args[1])
    if (!kickUser) return message.channel.send(errorEmbed)
    let kickMember = message.guild.member(kickUser)
    
        var reason = args.slice(2).join(" ");

        errorEmbed.setTitle(`Invalid User!`)
        errorEmbed.setDescription(`It seems like ${args[1]} isn't a user.`);
    
        if(!kickUser) return message.channel.send(errorEmbed);
        errorEmbed.setTitle('Moderator!')
        errorEmbed.setDescription("Sorry but this user is a moderator you can't kick a moderator.")
        if(kickMember.hasPermission("MANAGE_MESSAGES")) return message.channel.send(errorEmbed);
    
        var embedPrompt = new discord.MessageEmbed()
        .setTitle("Pleas react in 30 seconds")
        .setDescription(`Are you sure you whant to kick ${kickUser}`)
        .setColor("GREEN")
        .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL());
        
    
        var embed = new discord.MessageEmbed()
        .setColor("Green")
        .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL())
        .setTimestamp()
        .setDescription(`**kicked member:** ${kickUser} (${kickUser.id})
        **kicked by:** ${message.author}
        **Reason** ${reason}`)
    
        var sendEmbed = new discord.MessageEmbed()
        .setColor('RED')
        .setDescription(`**Hey There!**\nYou have been kicked.\nYou have been kicked by ${message.author} for the reason ${reason}.`)
        .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL())
        .setTimestamp();
    
        message.channel.send(embedPrompt).then( async msg =>{
        var emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);
            if(emoji === "✅"){

                errorEmbed.setTitle('ERROR')
                errorEmbed.setDescription("Sorry but something went wrong an unknowen error has acured.")
    
                message.delete();
                message.mentions.members.first().kick({reason:""}).catch(err =>{
                    if(err) {return message.channel.send(errorEmbed),
                console.log(err); }
                });
                
                message.channel.send(embed);
                kickUser.send(sendEmbed);
                errorEmbed.setTitle('Cannceling!')
                errorEmbed.setDescription('The kick has been cannceled.')
            }else if(emoji === "❌"){
                message.channel.send(errorEmbed).then(message => message.delete({ timeout: 10000 }));
            }
    
        })
    
         async function promptMessage(message, author, time, reactions){
             time *=1000;
    
             for(const reaction of reactions){
                 await message.react(reaction);
             }
    
             var filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;
    
             return message.awaitReactions(filter, {max:1, time: time}).then(collected => collected.first() && collected.first().emoji.name);
    
         }
        }
        module.exports.help = {
            name:"kick",
            alt: ["remove"]
        }