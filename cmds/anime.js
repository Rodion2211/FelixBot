const Discord = module.require("discord.js");
const request = require('request');
const animesf = require('snekfetch');

exports.run = async (bot, message, args, level) => {
    let res = await animesf.get('http://api.cutegirls.moe/json');
    if (res.body.status !== 200) {
        return message.channel.send('🚧 Ошибка при использовании,обратитесь в тех.поддержку.');
    }
    let animepicembed = new Discord.RichEmbed()
    .setColor('#f266f9')
    .setTitle('Лови фотку!')
    .setAuthor(`${bot.user.username}`, `${bot.user.avatarURL}`)
    .setImage(res.body.data.image)
    .setFooter(`FelixBot © | Все права защищены.`,`https://miro.medium.com/max/2400/1*pddKd6mxYB878Uc7A8RbOQ.png`);

    message.channel.send(animepicembed);
};
module.exports.help = {
  name: "anime"
};