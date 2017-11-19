const Discord = require('discord.js');
const request = require('request');
const config = require('../config.js');
const commandList = require('./commandList.js');

module.exports = {
    test: function(){
        console.log("ceva");
    },
    vreme: function(message){
        var arg = message.content.substring(config.config.prefix.length).split(" ");
        
        if(commandList.commandsList[0].alias.length > 0){
            for(var i = 0; i < commandList.commandsList[0].alias.length; i++){
                if(arg[0] == commandList.commandsList[0].command || arg[0] == commandList.commandsList[0].alias[i]){
                    contentCommand(message,arg);
                    return;
                }
            }
        }
        else{
            if(arg[0] == commandList.commandsList[0].command){
                contentCommand(message,arg);
                return;
            }
            
        }
    }
}

function contentCommand(message, arg){
    if(arg.length <= 1) {return;};
    var stringdata = "";
    for(var i = 1; i < arg.length;i++){
        stringdata += (arg[i] + " ");
    }
    
    request({
        url: 'http://api.openweathermap.org/data/2.5/forecast?q=' + stringdata + '&APPID=' + config.config.weather +'&units=metric'
    }, (error, response, body) => {
        if(error) return;
        
        var data = JSON.parse(body);
        
        if(data.cod == "404"){
            message.channel.send(data.message);
            return;
        }
        var stringdata = data.list[0].dt_txt.substring(0, 10);
        var embed = new Discord.RichEmbed()
        .setFooter("Requested by " + message.author.username)
        .setAuthor(data.city.name + " ," + data.city.country + " - " + stringdata + "\n")
        .setColor(getRandomColor())
        for(var i = 0; i < 6;i++){
            var stringore = data.list[i].dt_txt.substring(11, data.list[i].dt_txt.length - 3);
            embed.addField(stringore + " - " + data.list[i].weather[0].description,"Temp: " + data.list[i].main.temp + " / " + "Wind: " + data.list[i].wind.speed,true);
        }
        for(var i = 0; i < 6;i++){
            var date = new Date().getHours();
            var stringore = parseInt(data.list[i].dt_txt.substring(11, 13));
            console.log(date + " / " + stringore);
            if(date >= stringore){
                embed.setImage('http://openweathermap.org/img/w/' + data.list[i].weather[0].icon + '.png');
                break;
            }
            
        }

        message.channel.send({embed});
    });
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '0x';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }