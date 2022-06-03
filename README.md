<h1 align="center">Welcome to Binance Spot Order Notifier(NodeJS) via Telegram👋</h1>
<h2>Binance order notification when order created, cancelled or filled etc.. With this repo you will receive telegram notification for your binance spot order status.

## Please contact us for Future Order notification bot. Telegram: [@Killer_PD](https://t.me/Killer_PD)</h2>


<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/PiyushDixit96/binance-spot-order-notification-heroku/blob/main/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://twitter.com/PiyushDixit_" target="_blank">
    <img alt="Twitter: PiyushDixit_" src="https://img.shields.io/twitter/follow/PiyushDixit_.svg?style=social" />
  </a>
</p>

```diff
- when new commit happens, you need to create new heroku app using Deploy to heroku button, So that you can use the new feature.
- Supported Order Type: LIMIT, MARKET, STOP LOSS, STOP LOSS LIMIT, TAKE PROFIT, TAKE PROFIT LIMIT, LIMIT MAKER
- OCO not supported
```


<h3>Setup before Deploy to Heroku</h3>

<h4>SETUP TELEGRAM BOT</h4>

1. Create account on Telegram (skip if you have)
2. Create Telegram Bot Goto [Bot help](https://core.telegram.org/bots#3-how-do-i-create-a-bot) follow steps at the END Copy **TOKEN** save to Notepad for later use
3. Open created Bot and click **START**
4. Goto [@getuseridbot](https://t.me/getuseridbot) and click **START** and **copy NUMERIC VALUE** this is your **CHAT ID** save to Notepad for later use

<h4>SETUP BINANCE ACCOUNT</h4>

1. [Signup](https://www.binance.com/en/register?ref=35219097) for Binance (skip if you have)
2. Enable Two-factor Authentication (skip if you're done already)
3. Go API Center, [Create New](https://www.binance.com/en/my/settings/api-management?ref=35219097) Api Key and follow steps and at the END, SET API restrictions to  **ENABLE READING ** only
4. **Copy API Key and Secret Key** save to Notepad for later use

<h4>DEPLOY TO HEROKU</h4>

1. Create account on Heroku (skip if you have)
2. Login to Heroku (if you are not)
3. Click [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/PiyushDixit96/binance-spot-order-notification-heroku)

![createAPP](https://user-images.githubusercontent.com/79581397/167077352-e5809718-b0e6-4271-96d6-ea25053732cb.jpeg)

4. Give any name in "App name" field
5. Fill required fields in "Config Vars"
6. Click "Deploy app"
7. When you see , "Your app was successfully deployed." then your bot started automatically.
8. `important step for preventing idling heroku app`.
9. Click `Manage App`

![manageApp](https://user-images.githubusercontent.com/79581397/167078801-d5dc003b-e01a-4856-a6ab-4981d41f8b7c.jpeg)

10. Click `Heroku Scheduler`
 
![MopenScheduler](https://user-images.githubusercontent.com/79581397/167078857-d5056971-06e5-495c-8a9f-9efb854b6f8a.jpeg)

11. Click `Create job`

![createJob](https://user-images.githubusercontent.com/79581397/167079573-33c24c30-527c-4787-9a89-f96948692299.jpeg)

12. Enter your `App URL` On `Run Command` Text Box
13. To get your APP URL Go to `Step 10` Page Click `Open App` a new window open with your APP URL.

![App URL](https://user-images.githubusercontent.com/79581397/167081433-7bed3d20-4f67-4c49-9b42-c35602be30c7.jpeg)

14. Copy this URL look like this `https://floating-fjord-30360.herokuapp.com/`

![Capture](https://user-images.githubusercontent.com/79581397/167082558-c41c50ed-3d25-4807-b76b-13016e66412b.JPG)

15. Paste This URL with `curl` On `Run Command` Text Box, Example `curl https://floating-fjord-30360.herokuapp.com/`

![jobEditor](https://user-images.githubusercontent.com/79581397/167079603-8da398b9-2110-4ab8-a721-135fe7972826.jpeg)

16. Click `Save Job`

------------
> <h3>Give a ⭐️ if this project helped you!</h3>
------------
### Run Locally
- Download and install NodeJs
- Download Repo and open Repo root folder.
- Create .env in root folder and copy , paste below code
 ```sh
TELEGRAM_TOKEN="you telegram token"
TELEGRAM_CHAT_ID="your telegram chat id"
BINANCE_API_KEY="binance api key"
BINANCE_SECRET_KEY="binance api secret"
TIME_ZONE_STRING="your time zone string"
NOTIFICATION_SETTINGS="[{'NEW': 1, 'CANCELED': 1, 'TRADE': 1},{'LIMIT': 1, 'MARKET': 1, 'STOP_LOSS': 1},{'BUY': 1, 'SELL': 1}]"
```

- TIME_ZONE_STRING is not required. Default "Asia/Kolkata"
- NOTIFICATION_SETTINGS is not required. Default  [{"NEW":1,"CANCELED":1,"TRADE":1},{"LIMIT":1,"MARKET":1,"STOP_LOSS":1},{"BUY":1,"SELL":1}]


### NOTIFICATION_SETTINGS Description
```
- 0 is Disable and 1 is Enable
- when 'NEW': 0 it means you will not notify when new order created.
- when 'LIMIT': 0 it means you will not notify any LIMIT order.
- Example 1 : if you want only Filled orders alert,
  so settings are [{'NEW': 0, 'CANCELED': 0, 'TRADE': 1},{'LIMIT': 1, 'MARKET': 1, 'STOP_LOSS': 1},{'BUY': 1, 'SELL': 1}]
- Example 2 : if you want only Sell Filled orders alert,
  so settings are [{'NEW': 0, 'CANCELED': 0, 'TRADE': 1},{'LIMIT': 1, 'MARKET': 1, 'STOP_LOSS': 1},{'BUY': 0, 'SELL': 1}]
- All settings depends on another settings.

```

Time zone string example "Asia/Kolkata" and this is not required. [See Time zone string here](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)

- Edit required fields in .env file and save
- Open terminal on current folder 
- Run this command to install `npm install`
- Run this to start `npm start`

## Donate using Binance Pay
### Scan this QR Code Using Binance App Scanner

![BinancePayQR](https://user-images.githubusercontent.com/79581397/165224398-587a9b11-2429-4154-93a2-682241503906.png)

### My Binance Pay ID 
```sh
182311933
```

## Author

👤 **Piyush Dixit**

* Twitter: [@PiyushDixit\_](https://twitter.com/PiyushDixit_)
* Github: [@PiyushDixit96](https://github.com/PiyushDixit96)
* Telegram: [@Killer_PD](https://t.me/Killer_PD)

## Show your support

Give a ⭐️ if this project helped you!

------------
If this library helped you out feel free to donate.
- BTC: bc1qqewkmv335jdrt0jz6rn9sdm4jltd60qfw24fr9
- ETH: 0xE7212AAD5A8cE7eb02eF9Bee05332A679811dAf1
- NEO: AUp6giUAxQ3Y3RY8bUCuHrTa7HU25Ltuh4
------------


## 📝 License

Copyright © 2021 [@PiyushDixit96](https://github.com/PiyushDixit96).<br />
This project is [MIT](https://github.com/PiyushDixit96/binance-order-notifier/blob/main/LICENSE) licensed.
***
