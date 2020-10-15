const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
    try{
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`🚧**Ошибка:** Недостаточно прав! Отстутствует право "Управление сообщениями" `);
    if(args[0]>100) return bot.send("🚧**Ошибка:** Укажите значение меньше 100");
    if(args[0]<1) return bot.send("🚧**Ошибка:** Укажите значение больше 1");
    message.channel.bulkDelete(args[0]).then(() =>{
        let embed = new Discord.RichEmbed()
        .setColor("#FF9900")
        .setTitle("Сообщения очищены!")
        .setAuthor(`${bot.user.username}`, `${bot.user.avatarURL}`)
        .setDescription(`Удалено сообщений - [**${args[0]}**]
        
        Внимание! Бот не может удалять сообщения,написанные более 14-ти дней назад.`)
        .setFooter(`FelixBot © | Все права защищены.`,`https://miro.medium.com/max/2400/1*pddKd6mxYB878Uc7A8RbOQ.png`);
        message.channel.send(embed).then(msg => msg.delete(15*1000));
    });
    bot.send(botmessage);
}catch(err){
    console.log(err.name)
}
};
module.exports.help = {
    name: "clear"
};