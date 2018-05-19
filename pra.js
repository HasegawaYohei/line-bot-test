require('dotenv').config()
const querystring = require('querystring');
const axios = require('axios');
const A3RT_API_KEY = process.env.A3RT_API_KEY;

const getReplyMessage = async query => {
  const url = `https://api.a3rt.recruit-tech.co.jp/talk/v1/smalltalk`;
  const data = {
    apikey: A3RT_API_KEY,
    query
  };
  const result = await axios.post(url, querystring.stringify(data)).catch(e => e);

  return result.data.results[0].reply;
}

const test = async () => {
  const text = await getReplyMessage('りんご');
  console.dir(text);
}

test();