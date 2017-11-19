const Discord = require('discord.js');
const request = require('request');
const config = require('../config.js');
const commandList = require('./commandList.js');

module.exports = {
    command: function(message){
        var arg = message.content.substring(config.config.prefix.length).split(" ");
        
        if(commandList.commandsList[4].alias.length > 0){
            for(var i = 0; i < commandList.commandsList[4].alias.length; i++){
                if(arg[0] == commandList.commandsList[4].command || arg[0] == commandList.commandsList[4].alias[i]){
                    contentCommand(message,arg);
                    return;
                }
            }
        }
        else{
            if(arg[0] == commandList.commandsList[4].command){
                contentCommand(message,arg);
                return;
            }
            
        }
    }
}

function contentCommand(message, arg){
    if(message.channel.nsfw){
        switch(arg[1]){
            case "hentai":
                request({
                    url: 'https://api.imgur.com/3/gallery/r/hentai/top/',
                    headers: {'Authorization': 'Client-ID ' + config.config.imgur}
                }, (error, response, body) => {
                    var json = JSON.parse(body);
                    var index = Math.floor((Math.random() * 100) + 0);
                    message.channel.send(json.data[index].link);
                });
                break;
            case "search":
                if(arg.length > 2){
                    var datasearch = "";
                    for(var i = 2; i < arg.length; i++){
                        datasearch += arg[i] + "";
                    }

                    
                    client.get("https://api.redtube.com/?data=redtube.Videos.searchVideos&output=json&search=" + datasearch + "&thumbsize=medium", function (data, response) {
                        if(data.videos == null){
                            message.channel.send("N-am gasit nimic, fa o cautare mai complexa!");
                            return;
                        } 
                        var index = Math.floor((Math.random() * data.videos.length) + 0);
                        message.channel.send(data.videos[index].video.url);
                    });
                }else{
                    message.channel.send("N-ai cautat nimic uai!");
                }
                
                break;
            case "hsearch":
                if(arg.length > 2){
                    var datasearch = "";
                    for(var i = 2; i < arg.length; i++){
                        datasearch += arg[i] + "";
                    }

                    
                    client.get("https://api.redtube.com/?data=redtube.Videos.searchVideos&output=json&search=" + datasearch + "&tags[]=Hentai&thumbsize=medium", function (data, response) {
                        if(data.videos == null){
                            message.channel.send("N-am gasit nimic, fa o cautare mai complexa!");
                            return;
                        } 
                        var index = Math.floor((Math.random() * data.videos.length) + 0);
                        message.channel.send(data.videos[index].video.url);
                    });
                }else{
                    message.channel.send("N-ai cautat nimic uai!");
                }
                
                break;
            default:
                request({
                    url: 'https://api.imgur.com/3/gallery/r/nsfw/top/',
                    headers: {'Authorization': 'Client-ID ' + config.config.imgur}
                }, (error, response, body) => {
                    var json = JSON.parse(body);
                    var index = Math.floor((Math.random() * 100) + 0);
                    message.channel.send(json.data[index].link);
                });
                break;
        }
    }
    else{
        message.channel.send("Trebuie sa fi in canalul nsfw sa executi comanda!");
    }
}