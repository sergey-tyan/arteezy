const TOKEN = process.env.TELEGRAM_TOKEN;
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const options = {
    polling: true
};
const bot = new TelegramBot(TOKEN, options);

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


var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res){
    res.send('Thanks for waking me up! Arteezy bot here');
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});



