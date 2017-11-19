const Discord = require('discord.js');
const request = require('request');
const config = require('../config.js');
const commandList = require('./commandList.js');

module.exports = {
    command: function(message){
        var arg = message.content.substring(config.config.prefix.length).split(" ");
        
        if(commandList.commandsList[1].alias.length > 0){
            for(var i = 0; i < commandList.commandsList[1].alias.length; i++){
                if(arg[0] == commandList.commandsList[1].command || arg[0] == commandList.commandsList[1].alias[i]){
                    contentCommand(message,arg);
                    return;
                }
            }
        }
        else{
            if(arg[0] == commandList.commandsList[1].command){
                contentCommand(message,arg);
                return;
            }
            
        }
    }
}

function contentCommand(message, arg){
    if(arg.length > 1){
        var data = "";
        for(var i = 1; i < arg.length; i++){
            data += arg[i] + " ";
        }
        
        request({
        url: 'https://api.themoviedb.org/3/search/movie?api_key=' + config.config.movie + '&query=' + data
        }, (error, response, body) => {
            if(error) {console.log(error); return;}
            var data = JSON.parse(body);
            
            if(data.results.length > 0){
                var embed = new Discord.RichEmbed()
                .setColor(getRandomColor())
                .setFooter("Requested by " + message.author.username)
                .setImage('https://image.tmdb.org/t/p/w500' + data.results[0].poster_path)
                .addField("Original Title",data.results[0].original_title,true)
                .addField("Release Date",data.results[0].release_date, true)
                .addField("Original Language",data.results[0].original_language,true)
                .addField("Nota",data.results[0].vote_average, true)
                .addField("Description",data.results[0].overview);
                
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