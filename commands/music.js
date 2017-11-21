const Discord = require('discord.js');
const config = require('../config.js');
const commandList = require('./commandList.js');
const google = require('google');
const request = require("request");
var search = require('youtube-search');
const YTDL = require("ytdl-core"); 

const opts = {
	maxResults: 1,
	key: config.config.youtube
};

var servers = {};
var ytbcontor = 0;

module.exports = {
    command: function(message){
        var arg = message.content.substring(config.config.prefix.length).split(" ");
        
        if(commandList.commandsList[13].alias.length > 0){
            for(var i = 0; i < commandList.commandsList[13].alias.length; i++){
                if(arg[0] == commandList.commandsList[13].command || arg[0] == commandList.commandsList[13].alias[i]){
                    contentCommand(message,arg);
                    return;
                }
            }
        }
        else{
            if(arg[0] == commandList.commandsList[13].command){
                contentCommand(message,arg);
                return;
            }
            
        }
    }
}

function contentCommand(message, arg){
    switch(arg[1].toLowerCase()){
        case "play":
        var link = "";
        var stringdata = "";

        
        if (arg.length > 2){
            for(var i = 2; i < arg.length; i++){
                stringdata += (arg[i] + " ");
            }
        }
        else{
            message.channel.send("Structura comenzii este !!play <link sau nume melodie>");
            return;
        }

        if(arg[2].startsWith("http")){
            if(!message.member.voiceChannel){
                message.channel.send("Trebe sa fi in voice!");
                return;
            }

            if(!servers[message.guild.id]){
                servers[message.guild.id] = {
                    queue: [],
                    indexMesaj: 0,
                    skip: false,
                    pause: false
                };
            }

            var server = servers[message.guild.id];

            if(ytbcontor == 1 && server.queue.length == 0){
                server.queue.push(arg[2]);
                server.queue.push(arg[2]);
                ytbcontor = 0
            }
            else{
                server.queue.push(arg[2]);
                ytbcontor = 0
            }

            if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                play(connection, message);
            });
        }
        else{
            search(stringdata, opts, function(err, results) {
                if(err) return console.log(err);
                
                //console.log(results);
                link = results[0].link;

                var embed = new Discord.RichEmbed()
                .setAuthor(results[0].title, message.author.avatarURL)
                .setColor(0x00AE86)
                .setFooter("Requested by " + message.author.username)
                .setTimestamp()
                .addField("Link:",link)

                if(!message.member.voiceChannel){
                    message.channel.send("Trebe sa fi in voice!");
                    return;
                }

                if(!servers[message.guild.id]){
                    servers[message.guild.id] = {
                        queue: [],
                        indexMesaj: 0,
                        skip: false,
                        pause: false
                    };
                }

                var server = servers[message.guild.id];

                if(ytbcontor == 1 && server.queue.length == 0){
                    server.queue.push(link);
                    server.queue.push(link);
                    ytbcontor = 0;
                }
                else{
                    server.queue.push(link);
                    ytbcontor++;
                }
                

                for(var i = 0; i < server.queue.length; i++){
                    console.log(server.queue[i] + " " + server.queue.length);
                }
                message.channel.send({embed});

                if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                    play(connection, message);
                });
            });
        }
        break;
    case "skip":
        var server = servers[message.guild.id];
        if(server != null){
            server.skip == true;
            if(server.dispatcher) server.dispatcher.end();
        }
        
        break;
    case "stop":
        var server = servers[message.guild.id];
        ytbcontor = 0;
        if (message.guild.voiceConnection)
            {
                for (var i = server.queue.length - 1; i >= 0; i--) 
                {
                    server.queue.splice(i, 1);
            }
                server.dispatcher.end();
            }
        break;
    case "playlist":
        linklung = "https://www.youtube.com/playlist?list=";
        playlistId = arg[2].substring(linklung.length, arg[2].length);
        pageToken = "";
        yt_api_key = config.config.youtube;
        request("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=" + playlistId + 
            "&key=" + yt_api_key + "&pageToken=" + pageToken, (error, response, body) => {
                if(error) return;
                var json = JSON.parse(body);
                if(!message.member.voiceChannel){
                    message.channel.send("Trebe sa fi in voice!");
                    return;
                }

                if(!servers[message.guild.id]){
                    servers[message.guild.id] = {
                        queue: [],
                        indexMesaj: 0,
                        skip: false,
                        pause: false
                    };
                }

                var server = servers[message.guild.id];

                //shuffle(json.items);
                for(var i = 0; i < json.items.length; i++){
                    if(i == 1){
                        server.queue.push("https://www.youtube.com/watch?v=" + json.items[i].snippet.resourceId.videoId);
                    }
                    server.queue.push("https://www.youtube.com/watch?v=" + json.items[i].snippet.resourceId.videoId);
                }
                    

                if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                    play(connection, message);
                });
            });
        break;
    case "rplaylist":
        linklung = "https://www.youtube.com/playlist?list=";
        playlistId = arg[2].substring(linklung.length, arg[2].length);
        pageToken = "";
        yt_api_key = config.config.youtube;
        request("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=" + playlistId + 
            "&key=" + yt_api_key + "&pageToken=" + pageToken, (error, response, body) => {
                if(error) return;
                var json = JSON.parse(body);
                if(!message.member.voiceChannel){
                    message.channel.send("Trebe sa fi in voice!");
                    return;
                }

                if(!servers[message.guild.id]){
                    servers[message.guild.id] = {
                        queue: [],
                        indexMesaj: 0,
                        skip: false,
                        pause: false
                    };
                }

                var server = servers[message.guild.id];

                shuffle(json.items);
                for(var i = 0; i < json.items.length; i++){
                    if(i == 1){
                        server.queue.push("https://www.youtube.com/watch?v=" + json.items[i].snippet.resourceId.videoId);
                    }
                    server.queue.push("https://www.youtube.com/watch?v=" + json.items[i].snippet.resourceId.videoId);
                }
                    

                if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                    play(connection, message);
                });
            });
        break;
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

function play(connection, message){
	var server = servers[message.guild.id];

	//server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
	console.log(server.pause);
	if(server.pause){
		return;
	} else {
		server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
		server.indexMesaj++;
		console.log(server.indexMesaj);
		if(server.indexMesaj != 2 && !server.skip){
			message.channel.send(server.queue[0]);
		}
		
		server.queue.shift();

		server.dispatcher.on("end", function(){
			if(server.queue[0]) play(connection, message);
			else {connection.disconnect(); ytbcontor = 0;server.indexMesaj = 0;}
		});
	}
	
}	

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}