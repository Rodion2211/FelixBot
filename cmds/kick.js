const Discord = module.require("discord.js");
const fs = require("fs");
const customisation = require('../customisation.json');
let profile = require("../profile.json");
const bot = new Discord.Client();

module.exports.run = async (bot,message,args) => {
    let reason = args.slice(1).join(' ');
    try{
        if(message.mentions.users.first().id === "468111498137305090") return message.reply('🚧**Ошибка:** Ты не можешь кикнуть разработчика. 💢')
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`🚧**Ошибка:** Недостаточно прав! Отстутствует право "Кик участников" `);
    let rUser = bot.rUser;
    if (reason.length < 1) reason = '🚧**Ошибка:*** Отсутствует причина.';
    if(!args[0]) return bot.send("🚧**Ошибка:** Пользователь не указан! Используйте пинг для команды.");
    if(!rUser) return bot.send("🚧**Ошибка:** Пользователь не найден!");
    let embed = new Discord.RichEmbed()
    .setTitle("Участник кикнут:")
    .setColor('#e22216')
    .setAuthor(`${bot.user.username}`, `${bot.user.avatarURL}`)
    .addField("Администратор",message.author.username)
    .addField("Кикнул",`${rUser.user.username}`)
    .addField("Причина:",reason)
    .setFooter(`FelixBot © | Все права защищены.`,`https://miro.medium.com/max/2400/1*pddKd6mxYB878Uc7A8RbOQ.png`);
    
    message.guild.member(rUser).kick("123");
    message.channel.send(embed);
    message.rUser.user.send(`Вы были кикнуты.
    Модератор - **${message.author.username} 
    Причина - **${reason}**`) 
    }catch(err){
        console.log(err);
    }

};
module.exports.help = {
    name: "kick"
};