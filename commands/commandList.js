module.exports = {
    commandsList: [
        {
            //number: 0,
            command: "weather",
            alias: ["vr","v","vreme"],
            description: "Show weather of different location!",
            format: "weather <search>",
            function: function(message){
                const weather = require('./weather.js');
                weather.vreme(message);
            }
        },
        {
            //number: 1,
            command: "msearch",
            alias: ["movie","mv"],
            description: "",
            format: "msearch <search>",
            function: function(message){
                const msearch = require('./msearch.js');
                msearch.command(message);
            }
        },
        {
            //number: 2,
            command: "asearch",
            alias: ["anime","an"],
            description: "",
            format: "asearch <search>",
            function: function(message){
                const asearch = require('./asearch.js');
                asearch.command(message);
                console.log("intru aici");
            }
        },
        {
            //number: 3,
            command: "google",
            alias: ["gogu","g"],
            description: "",
            format: "google <search>",
            function: function(message){
                const google = require('./google.js');
                google.command(message);
            }
        },
        {
            //number: 4,
            command: "porn",
            alias: [],
            description: "",
            format: "porn <type>",
            function: function(message){
                const porn = require('./porn.js');
                porn.command(message);
            }
        },
        {
            //number: 5,
            command: "userinfo",
            alias: ["ui"],
            description: "",
            format: "userinfo [<member>]",
            function: function(message){
                const user = require('./userinfo.js');
                user.command(message);
            }
        },
        {
            //number: 6,
            command: "ysearch",
            alias: ["youtube"],
            description: "",
            format: "ysearch <search>",
            function: function(message){
                const search = require('./ysearch.js');
                search.command(message);
            }
        },
        {
            //number: 7,
            command: "dex",
            alias: ["dictionar"],
            description: "",
            format: "dex <search>",
            function: function(message){
                const dex = require('./dex.js');
                dex.command(message);
            }
        },
        {
            //number: 8,
            command: "cat",
            alias: ["pisica"],
            description: "",
            format: "cat",
            function: function(message){
                const pisica = require('./cat.js');
                pisica.command(message);
            }
        },
        {
            //number: 9,
            command: "dog",
            alias: ["caine"],
            description: "",
            format: "dog",
            function: function(message){
                const caine = require('./dog.js');
                caine.command(message);
            }
        },
        {
            //number: 10,
            command: "info",
            alias: [],
            description: "",
            format: "info",
            function: function(message){
                const info = require('./info.js');
                info.command(message);
            }
        },
        {
            //number: 11,
            command: "delete",
            alias: ["remove"],
            description: "",
            format: "delete <number>",
            function: function(message){
                const remove = require('./delete.js');
                remove.command(message);
            }
        },
        {
            //number: 12,
            command: "help",
            alias: ["h"],
            description: "",
            format: "help [<page>]",
            function: function(message){
                const help = require('./help.js');
                help.command(message);
            }
        },
        {
            //number: 13,
            command: "music",
            alias: ["m","player"],
            description: "-",
            format: "music <arg> <link|search>",
            function: function(message){
                const music = require('./music.js');
                music.command(message);
            }
        },
        {
            //number: 14,
            command: "ccommand",
            alias: ["cc"],
            description: "-",
            format: "ccomand <command_name> <message>",
            function: function(message){
                const command = require('./createCommand.js');
                command.command(message);
            }
        },
        {
            //number: 15
            command: "noprefix",
            alias: ["np"],
            description: "-",
            format: "noprefix <content> | <answer>",
            function: function(message){
                const noprefix = require('./noPrefixCond.js');
                noprefix.command(message);
            }
        }
    ]
}