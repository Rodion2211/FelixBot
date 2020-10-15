const Discord = module.require("discord.js");
const bot = new Discord.Client();
const fs = require("fs");
const customisation = require('../customisation.json');
let profile = require("../profile.json");

module.exports.run = async (bot,message,args) => {
    try{
      
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`🚧**Ошибка:** Недостаточно прав! Отстутствует право "Управление ролями" `);
    let rUser = bot.rUser;
    if(!args[0]) return bot.send("🚧**Ошибка:** Вы не указали пользователя! Используйте пинг для команды.");
    if(!rUser) return bot.send("🚧**Ошибка:** Пользователь не найден");
    if(!profile[rUser.id])return bot.send("🚧**Ошибка:** Пользователя нету в базе данных. Он должен написать одно и более сообщений.");
    if(profile[rUser.id]<=0) return bot.send("🚧**Ошибка:** У пользователя 0 предупреждений");
    profile[rUser.id].warns--;
    fs.writeFile('./profile.json',JSON.stringify(profile),(err)=>{
        if(err) console.log(err);
    });
    let embed = new Discord.RichEmbed()
    .setDescription("Предупреждение:")
    .setColor('#25ca85')
    .setAuthor(`${bot.user.username}`, `${bot.user.avatarURL}`)
    .addField("Администратор",message.author.username)
    .addField("Снял предупреждение",`${rUser.user.username}`)
    .addField("Количество предупрежденией",`${profile[rUser.id].warns}/3`)
    .setFooter(`FelixBot © | Все права защищены.`,`https://miro.medium.com/max/2400/1*pddKd6mxYB878Uc7A8RbOQ.png`);

    message.channel.send(embed);
    }catch(err){
        console.log(`1.${err.name}\n2.${err.message}\n3.${err.stack}`);
    }

};
module.exports.help = {
    name: "unwarn"
};