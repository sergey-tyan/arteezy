const TOKEN = process.env.TELEGRAM_TOKEN;
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const options = {
    polling: true
};
const bot = new TelegramBot(TOKEN, options);
const helpMessage = "This is inline bot, just start typing @ArteezyBot in any other chat and you will see list of commands. If it's not working, visit https://arteezy-bot.herokuapp.com/ to wake him up.";
const data = JSON.parse(fs.readFileSync('rtz_files.json', 'utf8'));

bot.on('inline_query', function onCallbackQuery(callbackQuery) {

    const query = callbackQuery.query;
    const id = callbackQuery.id;

    let results;

    if(!query){
        results = data;
    }else{
        results = data.filter((file) =>{
           return file.caption.toLowerCase().includes(query.toLowerCase());
        });
    }
    bot.answerInlineQuery(id, results);
});

function help(msg) {
    var chatId = msg.chat.id;
    bot.sendMessage(chatId, helpMessage);
}

bot.onText(/\/start/, help);
bot.onText(/\/help/, help);

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res){
    res.send('Thanks for waking me up! Arteezy bot here');
});


app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});



