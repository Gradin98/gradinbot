const Discord = require('discord.js');
const config = require("./config.js");
const readyEvent = require('./events/onReady.js');
const messageEvent = require('./events/onMessage.js');

const bot = new Discord.Client();

readyEvent.ready(bot);
messageEvent.message(bot);

bot.login(config.config.tokken);
