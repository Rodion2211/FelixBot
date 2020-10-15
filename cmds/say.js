const Discord = module.require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot,message,args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`🚧**Ошибка:** Недостаточно прав! Отстутствует право "Управление сообщениями" `);
    
    var text = message.content.split(' ').slice(1).join(' ');
      let embed = new Discord.RichEmbed()
          .setTitle('Неправильное использование!')
          .setColor(0x20ff00)
          .setAuthor(`${bot.user.username}`, `${bot.user.avatarURL}`)
          .setDescription(`Пожалуйста, используйте его как этот пример:\n**!say Текст**`)
          .setFooter(`FelixBot © | Все права защищены.`,`https://miro.medium.com/max/2400/1*pddKd6mxYB878Uc7A8RbOQ.png`);
      if(!text) return message.channel.send(embed);
       message.channel.send(text);
      message.delete();
      message.channel.stopTyping()
     }
     module.exports.help = {
        name: "say"
    };
    