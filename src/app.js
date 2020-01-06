import dotenv from 'dotenv';
import fs from 'fs-extra';
import SlackBot from 'slackbots';


// 設定の読み込み
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}
const env = process.env;

let bot = new SlackBot({
  token: env.SLACK_ACCESS_TOKEN, 
  name: env.SLACK_BOT_NAME
});

bot.on('start', function() {
  console.log('start bot');
});


async function message_bot(data){
  let channel = await search_channel_name(data.channel)
  if(data.text === 'hello'){
    bot.postMessageToChannel(channel, 'world!');
  }
  else if(data.text === 'こんにちは'){
    bot.postMessageToChannel(channel,"こんにちは,まちぞう");
  }
  else if(data.text === 'できた！'){
    bot.postMessageToChannel(channel,'えらーい');
  }
}


async function search_channel_name(id){
  let channels = await bot.getChannels();
  for(let channel of channels.channels){
    if(channel.id == id){
      return channel.name;
    }
  }
}

bot.on('message', async data => {
  if(data.type == 'message'){
    message_bot(data);
  }

});