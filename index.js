// import modules
require('dotenv').config()
const express = require('express')
const request = require('request')
const bodyParser = require('body-parser')

// create a new express server
const app = express()

const LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
})) // for parsing application/x-www-form-urlencoded

app.post('/callback', (req, res) => {
  const options = {
    method: 'POST',
    uri: 'https://api.line.me/v2/bot/message/reply',
    body: {
      replyToken: req.body.events[0].replyToken,
      messages: [{
        type: 'text',
        text: req.body.events[0].message.text // ここに指定した文字列がボットの発言になる
      }]
    },
    auth: {
      bearer: LINE_CHANNEL_ACCESS_TOKEN // ここは自分のtokenに書き換える
    },
    json: true
  }
  request(options, (err, response, body) => {
    console.log(JSON.stringify(response))
  })
  res.send('OK')
})

app.listen(process.env.PORT || 3000, () => {
  console.log('server starting on PORT:' + process.env.PORT)
})