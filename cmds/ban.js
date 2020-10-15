const Discord = module.require("discord.js");
const fs = require("fs");
const customisation = require('../customisation.json');
let profile = require("../profile.json");

module.exports.run = async (bot,message,args) => {
    let reason = args.slice(1).join(' ');
    try{
    if(message.mentions.users.first().id === "468111498137305090") return message.reply('🚧**Ошибка:** Ты не можешь забанить разработчика. 💢')
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`🚧**Ошибка:** Недостаточно прав! Отсутствует право "Бан участников" `);
    let rUser = bot.rUser;
    if (reason.length < 1) reason = '🚧**Ошибка:*** Отсутствует причина.';
    if(!args[0]) return bot.send(`🚧**Ошибка:** Пользователь не указан! Используйте пинг участника для выполнения действия`);
    if(!rUser) return bot.send(`🚧**Ошибка:** В базе данных нет данного пользователя. Он должен написать одно и более сообщений.`);
    let embed = new Discord.RichEmbed()
    .setTitle("Участник забанен:")
    .setColor('#e22216')
    .setAuthor(`${bot.user.username}`, `${bot.user.avatarURL}`)
    .addField("Модератор:",message.author.username)
    .addField("Был забанен:",`${rUser.user.username}`)
    .addField("Причина:",reason)
    .setFooter(`FelixBot © | Все права защищены.`,`https://miro.medium.com/max/2400/1*pddKd6mxYB878Uc7A8RbOQ.png`);
    message.guild.member(rUser).ban("Тобi Бан");
    message.channel.send(embed);
    }catch(err){
        console.log(`1.${err.name}\n2.${err.message}\n3.${err.stack}`);
    }

};
module.exports.help = {
    name: "ban"
};