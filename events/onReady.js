module.exports = {
    ready: function(bot){
        bot.on("ready", () => {
            console.log('The bot is ready!'); 

            bot.user.setPresence({ game: { name: 'g! help', type: 0 } }); 
        });
    }
}
