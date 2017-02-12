const fs = require('fs');
const TOKEN = process.env.TELEGRAM_TOKEN || 'YOUR_TELEGRAM_BOT_TOKEN';
const TelegramBot = require('node-telegram-bot-api');
const options = {
    webHook: {
        // Port to which you should bind is assigned to $PORT variable
        // See: https://devcenter.heroku.com/articles/dynos#local-environment-variables
        port: process.env.PORT
        // you do NOT need to set up certificates since Heroku provides
        // the SSL certs already (https://<app-name>.herokuapp.com)
        // Also no need to pass IP because on Heroku you need to bind to 0.0.0.0
    }
};
// Heroku routes from port :443 to $PORT
// Add URL of your app to env variable or enable Dyno Metadata
// to get this automatically
// See: https://devcenter.heroku.com/articles/dyno-metadata
const url = process.env.APP_URL || 'https://<app-name>.herokuapp.com:443';
const bot = new TelegramBot(TOKEN, options);

// This informs the Telegram servers of the new webhook.
// Note: we do not need to pass in the cert, as it already provided
bot.setWebHook(`${url}/bot${TOKEN}`);

const helpMessage = "This is inline bot, just start typing @ArteezyBot in any other chat and you will see list of commands.";
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
