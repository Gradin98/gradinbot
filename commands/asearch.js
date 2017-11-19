const Discord = require('discord.js');
const request = require('request');
const config = require('../config.js');
const commandList = require('./commandList.js');

module.exports = {
    command: function(message){
        var arg = message.content.substring(config.config.prefix.length).split(" ");
        
        if(commandList.commandsList[2].alias.length > 0){
            for(var i = 0; i < commandList.commandsList[2].alias.length; i++){
                if(arg[0] == commandList.commandsList[2].command || arg[0] == commandList.commandsList[2].alias[i]){
                    contentCommand(message,arg);
                    return;
                }
            }
        }
        else{
            if(arg[0] == commandList.commandsList[2].command){
                contentCommand(message,arg);
                return;
            }
            
        }
    }
}

function contentCommand(message,arg){
    if(arg.length > 1){
        var data = "";
        var data = "";
        for(var i = 1; i < arg.length; i++){
            data += arg[i] + " ";
        }
        
        request({
        url: 'https://kitsu.io/api/edge/anime?filter[text]=' + data
        }, (error, response, body) => {
            if(error) {console.log(error); return;}
            var data = JSON.parse(body);
            
            if(data.data.length > 0){
                var embed = new Discord.RichEmbed()
                .setColor(getRandomColor())
                .setFooter("Requested by " + message.author.username)
                .setImage(data.data[0].attributes.posterImage.original)
                .addField("Title",data.data[0].attributes.titles.en_jp,true)
                .addField("Status",data.data[0].attributes.status, true)
                .addField("Numar Episoade",data.data[0].attributes.episodeCount, true)
                .addField("Type",data.data[0].attributes.subtype, true)
                
                if(data.data[0].attributes.synopsis.length > 1000){
                    var string = data.data[0].attributes.synopsis.substring(0,1000) + "...";
                    embed.addField("Description",string);
                }else{
                    embed.addField("Description",data.data[0].attributes.synopsis);
                }
                
                
                message.channel.send({embed});
            }
            else{
                message.channel.send("Nu am gasit acest titlu!")
            }
            
        });
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '0x';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}