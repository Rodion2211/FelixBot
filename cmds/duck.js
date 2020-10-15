const Discord = module.require("discord.js");
const request = require('request');
const dogsuperagent = require('superagent');

exports.run = async (bot, message, args, level) => {
  const dogsuperagent = require('superagent');

  let {body} = await dogsuperagent
  .get(`https://random-d.uk/api/v1/random`);

  let dogpicembed = new Discord.RichEmbed()
  .setColor('#3cd60f')
  .setTitle('Лови фотку!')
  .setAuthor(`${bot.user.username}`, `${bot.user.avatarURL}`)
  .setImage(body.url)
  .setFooter(`FelixBot © | Все права защищены.`,`https://miro.medium.com/max/2400/1*pddKd6mxYB878Uc7A8RbOQ.png`);

  message.channel.send(dogpicembed);
};
module.exports.help = {
  name: "duck"
};