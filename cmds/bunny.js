
const Discord = module.require("discord.js");
const request = require('request');

exports.run = async (bot, message, args, level) => {
    const { get } = require('superagent')
    .get('https://api.bunnies.io/v2/loop/random/?media=gif,png')
    .end((err, response) => {
  let embed = new Discord.RichEmbed()
  .setColor('#b2f809')
  .setTitle('Лови фотку!')
  .setImage(response.body.media.poster)
  .setFooter(`FelixBot © | Все права защищены.`,`https://miro.medium.com/max/2400/1*pddKd6mxYB878Uc7A8RbOQ.png`);

   message.channel.send(embed);
  message.delete();
});
};
module.exports.help = {
  name: "bunny"
};