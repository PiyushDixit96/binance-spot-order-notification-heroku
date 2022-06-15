#!/usr/bin/env node

import Request from "request-promise";
import dotenv from "dotenv";
import express from "express";

dotenv.config();
let notification_def = [
    {"NEW": 1, "CANCELED": 1, "TRADE": 1}, {"LIMIT": 1, "MARKET": 1, "STOP_LOSS": 1}, {"BUY": 1, "SELL": 1}
]
let token = process.env['TELEGRAM_TOKEN'];
let chat_id = process.env['TELEGRAM_CHAT_ID'];
let api_key = process.env['BINANCE_API_KEY'];
let secret_key = process.env['BINANCE_SECRET_KEY'];
let NODE_ENV = process.env.NODE_ENV || "development";
let port = process.env.PORT || 3000;

let notification_settings = process.env['NOTIFICATION_SETTINGS'];
if (typeof notification_settings == "undefined") {
    notification_settings = notification_def
} else {
    notification_settings = JSON.parse(process.env['NOTIFICATION_SETTINGS'].replace(/'/g, '"'))
}

let timeZone = process.env.TIME_ZONE_STRING || 'Asia/Kolkata';
if (NODE_ENV === "development") {
    console.log("NODE_ENV development")
} else {
    console.log("NODE_ENV production")
}

console.log(`Your Notification Settings is - ${notification_settings}`);
//Indian time string
const event = new Date().toLocaleString('en-IN', {
    timeZone: timeZone,
    timeZoneName: 'short'
});
console.log(`Your TimeZone is - ${timeZone}`);
const app = express();
app.all('/', (req, res) => res.send('Bot is Running'));
app.listen(port, () => console.log(`${event} - Server started on ${port} port`));
//BinanceWS
const binanceApi = require('binance');
const binanceWS = new binanceApi.BinanceWS(false);
try {
    let binanceRest;
    binanceRest = new binanceApi.BinanceRest({
        key: api_key,
        secret: secret_key,
        recvWindow: 10000
    })
    binanceWS.onUserData(binanceRest, data => {
        console.log(`${event} - Session Message: `, data);
        process_data(data);
    }, 60000).then(() => {
        console.log(`${event} - Monitoring Spot User Order Data for binance.com`);
        sendMessage(`<b>Binance Spot Order Monitor Started</b>\nthis message shows that you or heroku(if your are using) restart the bot.`)
    })
} catch (err) {
    console.error(`${event} - ${err}`)
    sendMessage(err.toString())
}

function fixFloat(floatNum, Precision = 8) {
    let num = Number.parseFloat(floatNum).toFixed(Precision);
    let str = num.toString();
    return str.replace(/(\.\d+?)0+\b/g, "$1") //fix 20.000 to 20.0 or 0.0000000120 to 0.000000012
}

//[{"NEW": 1, "CANCELED": 1, "TRADE": 1},{"LIMIT": 1, "MARKET": 1, "STOP_LOSS": 1},{"BUY": 1, "SELL": 1}]

let notification_orderStatus = notification_settings[0]     //{"NEW": 1, "CANCELED": 1, "TRADE": 1}
let notification_orderType = notification_settings[1]       //{"LIMIT": 1, "MARKET": 1, "STOP_LOSS": 1}
let notification_side = notification_settings[2]            //{"BUY": 1, "SELL": 1}

function process_data(data) {
    let {
        e: eventType,
    } = data;
    let txt;
    if (eventType === 'executionReport') {
        let {
            x: executionType,
            s: symbol,
            p: price,
            q: quantity,
            S: side,
            o: orderType,
            i: orderId,
            X: orderStatus,
            l: lastTradeQuantity,
            z: Cumulative_filled_quantity,
            L: Last_price,
            r: Order_reject_reason
        } = data;
        let str4 = Trim(symbol, 4)
        let str3 = Trim(symbol, 3)
        let sy;
        if (["USDT", "BUSD", "TUSD", "USDC", "BIDR", "IDRT", "BVND"].includes(str4)) {
            sy = str4
        }
        if (["BNB", "BTC", "XRP", "TRX", "ETH", "AUD", "BRL", "EUR", "GBP", "RUB", "TRY", "PAX", "DAI", "UAH", "NGN", "VAI"].includes(str3)) {
            sy = str3
        }
        let total = ``;
        if (orderType === "MARKET") {
            price = Last_price
        } else {
            total = `\n<b>Total:</b>  ${fixFloat(Number(price) * Number(quantity))} ${sy}`
        }
        if (executionType === 'NEW' && notification_orderStatus['NEW'] === 1) {
            if (side === 'BUY' && notification_side['BUY'] === 1 || side === 'SELL' && notification_side['SELL'] === 1) {
                if (orderStatus === 'NEW') {
                    if (orderType === "MARKET" && notification_orderType['MARKET'] === 1) {
                        txt = `✅ ✅ ✅\n<b>Spot ${orderType} ${side} Order CREATED</b>\n<b>Symbol:</b>  #${symbol}\n<b>Quantity:</b>  ${fixFloat(quantity)}\n<b>Order ID:</b>  #ID${orderId}`
                    } else if (
                        ((orderType === "LIMIT" || orderType === "LIMIT_MAKER") && notification_orderType['LIMIT'] === 1) ||
                        ((orderType === "STOP_LOSS" || orderType === "STOP_LOSS_LIMIT" || orderType === "TAKE_PROFIT" || orderType === "TAKE_PROFIT_LIMIT") && notification_orderType['STOP_LOSS'] === 1)
                    ) {
                        txt = `✅ ✅ ✅\n<b>Spot ${orderType} ${side} Order CREATED</b>\n<b>Symbol:</b>  #${symbol}\n<b>Price:</b>  ${price}\n<b>Quantity:</b>  ${fixFloat(quantity)}${total}\n<b>Order ID:</b>  #ID${orderId}`
                    }
                } else if (orderStatus === 'REJECTED') {
                    if (orderType === "MARKET" && notification_orderType['MARKET'] === 1) {
                        txt = `🚫 🚫 🚫\n<b>Spot ${orderType} ${side} Order REJECTED</b>\n<b>Symbol:</b>  #${symbol}\n<b>Quantity:</b>  ${fixFloat(quantity)}\n<b>Order ID:</b>  #ID${orderId}\n<b>Order reject reason:</b>  #ID${Order_reject_reason}`
                    } else if (
                        ((orderType === "LIMIT" || orderType === "LIMIT_MAKER") && notification_orderType['LIMIT'] === 1) ||
                        ((orderType === "STOP_LOSS" || orderType === "STOP_LOSS_LIMIT" || orderType === "TAKE_PROFIT" || orderType === "TAKE_PROFIT_LIMIT") && notification_orderType['STOP_LOSS'] === 1)
                    ) {
                        txt = `🚫 🚫 🚫\n<b>Spot ${orderType} ${side} Order REJECTED</b>\n<b>Symbol:</b>  #${symbol}\n<b>Price:</b>  ${price}\n<b>Quantity:</b>  ${fixFloat(quantity)}${total}\n<b>Order ID:</b>  #ID${orderId}\n<b>Order reject reason:</b>  #ID${Order_reject_reason}`
                    }
                }
            }
        } else if (executionType === 'CANCELED' && notification_orderStatus['CANCELED'] === 1) {
            if (side === 'BUY' && notification_side['BUY'] === 1 || side === 'SELL' && notification_side['SELL'] === 1) {
                if (orderStatus === 'CANCELED') {
                    if (
                        ((orderType === "LIMIT" || orderType === "LIMIT_MAKER") && notification_orderType['LIMIT'] === 1) ||
                        ((orderType === "STOP_LOSS" || orderType === "STOP_LOSS_LIMIT" || orderType === "TAKE_PROFIT" || orderType === "TAKE_PROFIT_LIMIT") && notification_orderType['STOP_LOSS'] === 1)
                    ) {
                        txt = `❎ ❎ ❎\n<b>Spot ${orderType} ${side} Order CANCELED</b>\n<b>Symbol:</b>  #${symbol}\n<b>Price:</b>  ${price}\n<b>Quantity:</b>  ${fixFloat(quantity)}${total}\n<b>Order ID:</b>  #ID${orderId}`
                    }
                }
            }
        } else if (executionType === 'TRADE' && notification_orderStatus['TRADE'] === 1) {
            if (side === 'BUY' && notification_side['BUY'] === 1 || side === 'SELL' && notification_side['SELL'] === 1) {
                if ((orderType === "MARKET" && notification_orderType['MARKET'] === 1) ||
                    ((orderType === "LIMIT" || orderType === "LIMIT_MAKER") && notification_orderType['LIMIT'] === 1) ||
                    ((orderType === "STOP_LOSS" || orderType === "STOP_LOSS_LIMIT" || orderType === "TAKE_PROFIT" || orderType === "TAKE_PROFIT_LIMIT") && notification_orderType['STOP_LOSS'] === 1)
                ) {
                    if (orderStatus === 'PARTIALLY_FILLED') {
                        txt = `⌛ ⌛ ⌛\n<b>Spot ${orderType} ${side} Order PARTIALLY FILLED</b>\n<b>Symbol:</b>  #${symbol}\n<b>Price:</b>  ${Last_price}\n<b>Last Filled:</b>  ${fixFloat(lastTradeQuantity)}\n<b>Total Filled:</b>  ${fixFloat(Cumulative_filled_quantity)}\n<b>Remaining:</b>  ${fixFloat(Number(quantity) - Number(Cumulative_filled_quantity))}\n<b>Order ID:</b>  #ID${orderId}`
                    } else if (orderStatus === 'FILLED') {
                        txt = `💰 💰 💰\n<b>Spot ${orderType} ${side} Order FULLY FILLED</b>\n<b>Symbol:</b>  #${symbol}\n<b>Price:</b>  ${Last_price}\n<b>Filled:</b>  ${fixFloat(Cumulative_filled_quantity)}${total}\n<b>Order ID:</b>  #ID${orderId}`
                    }
                }
            }
        }
        if (txt) {
            sendMessage(txt)
        }
    }
}

//sending telegram message
function sendMessage(text) {
    let params = {
        chat_id: chat_id,
        text: text,
        parse_mode: 'html'
    };
    let options = {
        uri: 'https://api.telegram.org/bot' + token + '/' + 'sendMessage',
        qs: params,
        simple: false,
        resolveWithFullResponse: true,
        forever: true
    };
    return Request(options).then(resp => {
        if (resp.statusCode !== 200) {
            throw new Error(resp.statusCode + ':\n' + resp.body);
        }
        let updates = JSON.parse(resp.body);
        if (updates.ok) {
            console.log("Message send via Telegram")
            return updates;
        } else {
            console.log(`something went wrong while sending message to telegram see detailed error below.`)
            console.error(updates)
            return null;
        }
    }).catch(error => {
        throw error;
    });
}

function Trim(input, last_n_chr) {
    if (!input || !input.length) {
        return;
    }
    let l = input.length - last_n_chr
    return input.slice(l);
}
