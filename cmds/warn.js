const Discord = module.require("discord.js");
const fs = require("fs");
let profile = require("../profile.json");
const customisation = require('../customisation.json');
const bot = new Discord.Client();

module.exports.run = async (bot,message,args) => {
    let reason = args.slice(1).join(' ');
    try{
    if(message.mentions.users.first().id === "468111498137305090") return message.reply('🚧**Ошибка :** Ты не можешь выдать варн разработчику. 💢')
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`🚧**Ошибка :** Недостаточно прав! Отстутствует право "Кик участников" `);
    let rUser = bot.rUser;
    if (reason.length < 1) reason = '🚧**Ошибка:*** Отсутствует причина.';
    if(!args[0]) return bot.send(`🚧**Ошибка:** Пользователь не указан! Используйте пинг участника для выполнения действия`);
    if(!rUser) return message.channel.send("🚧**Ошибка :** Пользователь не найден");
    if(!profile[rUser.id])return message.channel.send("🚧**Ошибка :** Пользователя нету в базе данных. Он должен написать одно и более сообщений.");
    profile[rUser.id].warns++;
    fs.writeFile('./profile.json',JSON.stringify(profile),(err)=>{
        if(err) console.log(err);
    });
    if(profile[rUser.id].warns >=3){
        message.guild.member(rUser).kick("3/3 Предупреждений");
    }
    let embed = new Discord.RichEmbed()
    .setTitle("Предупреждение:")
    .setAuthor(`${bot.user.username}`, `${bot.user.avatarURL}`)
    .setColor('RANDOM')
    .addField("Модератор:",message.author.username)
    .addField("Получил варн:",`${rUser.user.username}`)
    .addField("Причина:", reason)
    .addField("Количество предупреждений:",`${profile[rUser.id].warns}/3`)
    .setFooter(`FelixBot © | Все права защищены.`,`https://miro.medium.com/max/2400/1*pddKd6mxYB878Uc7A8RbOQ.png`);

    message.channel.send(embed);
    }catch(err){
        console.log(`1.${err.name}\n2.${err.message}\n3.${err.stack}`);
    }

};
module.exports.help = {
    name: "warn"
};