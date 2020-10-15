const discord = require('discord.js');
const config = require('../config.json');
const customisation = require('../customisation.json');

module.exports.run = async (bot, message, args) => {

    let target = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let reason = args.slice(1).join(' ');
    let reports = message.guild.channels.find(x => x.name === "репорты","reports","жалобы", config.reportsChannel);

    if (!target) return message.reply('❌**Error:** Пожалуйста укажите участника!');
    if (!reason) return message.reply('❌**Error:** Пожалуйста укажите причину репорта!');
    if (!reports) return message.reply(`❌**Error:** Пожалуйста, создайте канал под названием ${config.reportsChannel} для регистрации репортов!`);

    let embed = new discord.RichEmbed()
        .setColor('#af0f0f')
        .setThumbnail(target.user.avatarURL)
        .addField('Участник', `${message.author.username} его ID: ${message.author.id}`)
        .addField('Отправил репорт', `${target.user.username} его ID: ${target.user.id}`)
        .addField('Репорт был создан', message.createdAt)
        .addField('Причина репорта', reason)
        .setFooter(`FelixBot© | Все права защищены.`,`https://miro.medium.com/max/2400/1*pddKd6mxYB878Uc7A8RbOQ.png`);

    message.channel.send(`${message.author} отправил репорт на ${target}. Причина - ${reason}`).then(msg => msg.delete(2000));
    reports.send(embed);

};

module.exports.help = {
    name: 'report',
    aliases: []
};