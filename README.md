<h1 align="center">Welcome to Binance Spot Order Notifier(NodeJS) via Telegram👋</h1>
<h2>Binance order notification when order created, cancelled or filled etc.. With this repo you will receive telegram notification for your binance spot order status.

## Please contact us for Future Order notification bot. Telegram: [@Killer_PD](https://t.me/Killer_PD)
</h2>

<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/PiyushDixit96/binance-order-notifier/blob/main/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://twitter.com/PiyushDixit_" target="_blank">
    <img alt="Twitter: PiyushDixit_" src="https://img.shields.io/twitter/follow/PiyushDixit_.svg?style=social" />
  </a>
</p>

```diff
- when new commit happens, you need to create new heroku app using Deploy to heroku button, So that you can use the new feature.
- OCO not supported
```
------------
<h2>Setup before Deploy to Heroku</h2>

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
3. Click [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/PiyushDixit96/binance-order-notifier)

![fullUntitled](https://user-images.githubusercontent.com/79581397/117697809-89587b00-b1e0-11eb-98d3-3086f973ce84.jpg)

5. Give any name in "App name" field
6. Fill required fields in "Config Vars"
7. Click "Deploy app"
8. When you see , "Your app was successfully deployed." then your bot started automatically.
9. `important step for preventing idling heroku app`. Click "View" and copy URL when new tab open in your browser save to Notepad for later use

![DSCapture](https://user-images.githubusercontent.com/79581397/117698015-d1779d80-b1e0-11eb-8b57-0224ab96e3ee.JPG)

10. Goto [UptimeRobot](https://uptimerobot.com/) and Create free account
11. Click "Add New Monitor"
12. Monitor Type : HTTPS
13. Friendly Name : any name
14. URL (or IP): paste URL of your app. (you copy URL in Step 9)
15. Monitoring Interval : 20 minutes
16. Click " Create Monitor "
17. Now Enjoy
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

```

Time zone string example "Asia/Kolkata" and this is not required. [See Time zone string here](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)

- Edit required fields in .env file and save
- Open terminal on current folder 
- Run this command to install `npm install`
- Run this to start `npm start`

## Author

👤 **Piyush Dixit**

* Twitter: [@PiyushDixit\_](https://twitter.com/PiyushDixit_)
* Github: [@PiyushDixit96](https://github.com/PiyushDixit96)
* Telegram: [@Killer_PD](https://t.me/Killer_PD)

## Show your support

Give a ⭐️ if this project helped you!

## Donate
If this library helped you out feel free to donate.

- BTC: bc1qqewkmv335jdrt0jz6rn9sdm4jltd60qfw24fr9
- ETH: 0xE7212AAD5A8cE7eb02eF9Bee05332A679811dAf1
- NEO: AUp6giUAxQ3Y3RY8bUCuHrTa7HU25Ltuh4
- BNB: bnb1h6gylq3xgrxmw7t8k2r8e0xn7rquefeqjfcanx

## 📝 License

Copyright © 2021 [@PiyushDixit96](https://github.com/PiyushDixit96).<br />
This project is [MIT](https://github.com/PiyushDixit96/binance-order-notifier/blob/main/LICENSE) licensed.
***
