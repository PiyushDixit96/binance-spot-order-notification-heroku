#!/usr/bin/env node
const dotenv = require('dotenv');
dotenv.config();

const token = process.env['TELEGRAM_TOKEN'];
const chat_id = process.env['TELEGRAM_CHAT_ID'];
const api_key = process.env['BINANCE_API_KEY'];
const secret_key = process.env['BINANCE_SECRET_KEY'];
const NODE_ENV = process.env.NODE_ENV || "development";
const port = process.env.PORT || 3000;
const timeZone = process.env.TIME_ZONE_STRING || 'Asia/Kolkata';

if (process.env.NODE_ENV === "development") {
    console.log("NODE_ENV development")
} else { 
    console.log("NODE_ENV production")
}
//Indian time string
const event = new Date().toLocaleString('en-IN', { timeZone: timeZone, timeZoneName: 'short' });

//sending telegram message
const Slim_bot = require('slimbot');
const bot = new Slim_bot(token);

//only for heroku port error
const express = require('express');
const app = express();
app.all('/', (req, res) => res.send('Bot is Running'));
app.listen(port, () => console.log(`${event} - Server started on ${port} port`));

//BinanceWS
const binanceApi = require('binance');
const binanceWS = new binanceApi.BinanceWS(true);
try {
    binanceRest = new binanceApi.BinanceRest({
        key: api_key,
        secret: secret_key,
        recvWindow: 10000
    })
    binanceWS.onUserData(binanceRest, data => {
        console.log(`${event} - Session Message: `, data);
        process_data(data);

    }, 60000).then(ws => {
        console.log(`${event} - Monitoring Spot User Order Data for binance.com`);
        toTelegram(`<b>Binance Spot Order Monitor Started</b>\nthis message shows that you or heroku(if your are using) restart the bot.`)
    })
} catch (err) {
    console.error(`${event} - ${err}`)
    toTelegram(err.toString())
}

function fixFloat(floatNum, Precision = 8) {
    const num = Number.parseFloat(floatNum).toFixed(Precision);
    const str = num.toString();
    return str.replace(/(\.\d+?)0+\b/g, "$1")   //fix 20.000 to 20.0 or 0.0000000120 to 0.000000012
}


function process_data(data) {
    let txt;
    if (data.eventType === 'executionReport') {
        if (data.executionType === 'NEW') {
            if (data.orderStatus === 'NEW') {
                txt = `💸 💸 💸\n<b>Spot Order CREATED\nSide:</b>  ${data.side}\n<b>Symbol:</b>  #${data.symbol}\n<b>Price:</b>  ${data.price}\n<b>Quantity:</b>  ${fixFloat(data.quantity)}\n<b>Order ID:</b>  #ID${data.orderId}`
            }
            else if (data.orderStatus === 'REJECTED') {
                txt = `🚫 🚫 🚫\n<b>Spot Order REJECTED\nSide:</b>  ${data.side}\n<b>Symbol:</b>  #${data.symbol}\n<b>Price:</b>  ${data.price}\n<b>Quantity:</b>  ${fixFloat(data.quantity)}\n<b>Order ID:</b>  #ID${data.orderId}`
            }
        } else if (data.executionType === 'CANCELED') {
            if (data.orderStatus === 'CANCELED') {
                txt = `🛑 🛑 🛑\n<b>Spot Order CANCELED\nSide:</b>  ${data.side}\n<b>Symbol:</b>  #${data.symbol}\n<b>Price:</b>  ${data.price}\n<b>Quantity:</b>  ${fixFloat(data.quantity)}\n<b>Order ID:</b>  #ID${data.orderId}`
            }
        } else if (data.executionType === 'TRADE') {
            if (data.orderStatus === 'PARTIALLY_FILLED') {
                txt = `💰 💰 💰\n<b>Spot Order PARTIALLY FILLED\nSide:</b>  ${data.side}\n<b>Symbol:</b>  #${data.symbol}\n<b>Price:</b>  ${data.price}\n<b>Last Filled:</b>  ${fixFloat(data.lastTradeQuantity)}\n<b>Remaining:</b>  ${fixFloat(Number(data.quantity) - Number(data.accumulatedQuantity))}\n<b>Order ID:</b>  #ID${data.orderId}`
            } else if (data.orderStatus === 'FILLED') {
                txt = `✅ ✅ ✅\n<b>Spot Order FULLY FILLED\nSide:</b>  ${data.side}\n<b>Symbol:</b>  #${data.symbol}\n<b>Price:</b>  ${data.price}\n<b>Filled:</b>  ${fixFloat(data.accumulatedQuantity)}\n<b>Order ID:</b>  #ID${data.orderId}`
            }
        } else if (['REPLACED', 'EXPIRED', 'PENDING_CANCEL'].includes(data.orderStatus)) {
            txt = `🔴 🟡 🔵\n<b>Spot Order ${data.orderStatus}\nSide:</b>  ${data.side}\n<b>Symbol:</b>  #${data.symbol}\n<b>Price:</b>  ${data.price}\n<b>Quantity:</b>  ${fixFloat(data.quantity)}\n<b>Order ID:</b>  #ID${data.orderId}`
        } else {
            txt = `⚠️ ⚠️ ⚠️\n<b>Undefined</b>\nExecution Type:  ${data.executionType}\nOrder Status ${data.orderStatus}\nFull Details:\n${msg}`
        }
        toTelegram(txt)
    }
}

function toTelegram(text) {
    let parse_mode = {
        parse_mode: 'html'
    };
    bot.sendMessage(chat_id, text, parse_mode)
        .then(message => {
            //console.log(message);
            if (message['ok'] === true) {
                console.log(`${event} - Message send to ${message['result']['chat']['first_name']} via Telegram`)
            } else if (message['ok'] === false) {
                console.log(`${event} - something went wrong while sending message to telegram see detailed error below.`)
                console.error(message)
            }
        });
}
