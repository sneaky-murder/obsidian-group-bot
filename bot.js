const discord = require("discord.js");



const fs = require("fs");

const client = new discord.Client();



client.command = new discord.Collection();

fs.readdir("./commands/info/", (err, files) =>{

if(err) console.log(err);

var jsFiles = files.filter(f => f.split(".").pop() === "js");

if(jsFiles.length <=0){
    console.log("No info commands found.")
    return
};

jsFiles.forEach((f, i) => {

    var fileGet = require(`./commands/info/${f}`);
    console.log(`the file "${f}" is loaded`);
    client.command.set(fileGet.help.name,  fileGet);
    client.command.set(fileGet.help.alt[0], fileGet)
    client.command.set(fileGet.help.alt[1], fileGet)
    client.command.set(fileGet.help.alt[2], fileGet)



})


});

fs.readdir("./commands/fun/", (err, files) =>{

    if(err) console.log(err);
    
    var jsFiles = files.filter(f => f.split(".").pop() === "js");
    
    if(jsFiles.length <=0){
        console.log("No fun commands found.")
        return
    };
    
    jsFiles.forEach((f, i) => {
    
        var fileGet = require(`./commands/fun/${f}`);
        console.log(`the file "${f}" is loaded`);
        client.command.set(fileGet.help.name,  fileGet);
        client.command.set(fileGet.help.alt[0], fileGet)
        client.command.set(fileGet.help.alt[1], fileGet)
        client.command.set(fileGet.help.alt[2], fileGet)
    
    
    
    })
    
    
    });

fs.readdir("./commands/moderation/", (err, files) =>{

    if(err) console.log(err);
    
    var jsFiles = files.filter(f => f.split(".").pop() === "js");
    
    if(jsFiles.length <=0){
        console.log("No mod commands found.")
        return
    };
    
    jsFiles.forEach((f, i) => {
    
        var fileGet = require(`./commands/moderation/${f}`);
        console.log(`the file "${f}" is loaded`);
        client.command.set(fileGet.help.name,  fileGet);
        client.command.set(fileGet.help.alt[0], fileGet)
        client.command.set(fileGet.help.alt[1], fileGet)
        client.command.set(fileGet.help.alt[2], fileGet)
    
    
    
    })
    
    
    });

client.login('ODI5MzcyMDM5ODk0MjY5OTYy.YG3K5w.pE_YuvSqsvy8pwRHJCROlnMx4Tc');
client.on("ready", async () =>{
    console.log(`${client.user.username} is back alive!😮`),
    client.user.setActivity("In developing", {type:"PLAYING"});
});

client.on("message", async message =>{
    

    if(message.author.bot) return;
    if(message.channel.type == "dm") return;

    var prefix = "$"

    var messageArray = message.content.split(" ");

    var command = messageArray[0];
    
    var commands = client.command.get(command.slice(prefix.length));

    var args = message.content.slice(prefix.length).split(/ +/);
    
    var arguments = messageArray.slice(1)
    if(commands) commands.run(client, message, arguments, prefix, args);

    if (!message.content.startsWith(prefix)){ return}
});
