const Discord = require('discord.js');
const customisation = require('../customisation.json');

function checkDays(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? "дня" : " дней") + " назад";
};
module.exports.run = (bot, message, args) => {
    let verifLevels = ["Отсутствует", "Низкая", "Средняя", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];
    let region = {
        "brazil": "Бразилия",
        "eu-central": "Центральная Европа",
        "singapore": "Сингапур",
        "us-central": "U.S. Central",
        "sydney": "Sydney",
        "us-east": "U.S. East",
        "us-south": "U.S. South",
        "us-west": "U.S. West",
        "eu-west": "Western Europe",
        "vip-us-east": "VIP U.S. East",
        "london": "Лондон",
        "amsterdam": "Amsterdam",
        "hongkong": "Hong Kong",
        "russia": "Россия"
    };
    
    var emojis;
    if (message.guild.emojis.size === 0) {
        emojis = 'None';
    } else {
        emojis = message.guild.emojis.size;
    }

    const embed = new Discord.RichEmbed()
  .setAuthor(message.guild.name, message.guild.iconURL ? message.guild.iconURL : client.user.displayAvatarURL)
  .setThumbnail(message.guild.iconURL)
  .setTimestamp()
  .setAuthor(`${bot.user.username}`, `${bot.user.avatarURL}`)
  .addField("Был создан", `${message.guild.createdAt.toString().substr(0, 15)},\n(${checkDays(message.guild.createdAt)})`, true)
  .addField("ID", message.guild.id, true)
  .addField("Владелец", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
  .addField("Регион", region[message.guild.region], true)
  .addField("Количество Пользователей", message.guild.memberCount, true)
  .addField("Количество участников", message.guild.members.filter(m => !m.user.bot).size, true)
  .addField("Количество Ботов", message.guild.members.filter(m => m.user.bot).size, true)
  .addField("АФК Тайм-аут", message.guild.afkTimeout / 60 + ' минут', true)
  .addField("Ролей", message.guild.roles.size, true)
  .addField("Каналов", message.guild.channels.size, true)
  .addField("Эмодзи", `${emojis}/100`, true)
  .addField("Уровень Проверки", verifLevels[message.guild.verificationLevel], true)
  .setColor(Math.floor(Math.random()*16777215))
  .setFooter(`FelixBot © | Все права защищены.`,`https://miro.medium.com/max/2400/1*pddKd6mxYB878Uc7A8RbOQ.png`);
  message.channel.send({embed});
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["serverstats"],
  permLevel: 0
};

module.exports.help = {
  name: 'serverinfo',
  description: 'Displays information about the server.',
  usage: 'serverinfo'
};
