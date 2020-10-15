const Discord = require('discord.js');
const customisation = require('../customisation.json');
exports.run = async (bot, message, args) => {
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let rUser = bot.rUser;
  let muteRole = bot.guilds.get(message.guild.id).roles.find('name', 'Muted');
  if(message.mentions.users.first().id === "468111498137305090") return message.reply('🚧**Ошибка:** Ты не можешь замутить разработчика. 💢')
  if(message.author.id === message.mentions.users.first()) return message.reply("🚧**Ошибка:** Ты не можешь замутить сам себя. 🗿");
  if (!message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return message.reply(`🚧**Ошибка:** Недостаточно прав! Отстутствует право "Управление ролями" `);
  if(!args[0]) return bot.send(`🚧**Ошибка:** Пользователь не указан! Используйте пинг участника для выполнения действия`);
  if(!rUser) return bot.send(`🚧**Ошибка:** В базе данных нет данного пользователя. Он должен написать одно и более сообщений.`);
  if (!muteRole) {
    try {
        muteRole = await message.guild.createRole({
            name:"Muted",
            color: "#000000",
            permissions:[]
        });

        message.guild.channels.forEach(async (channel, id) => {
            await channel.overwritePermissions(muteRole, {
                SEND_MESSAGES: false,
                MANAGE_MESSAGES: false,
                READ_MESSAGES: false,
                ADD_REACTIONS: false
            });
        });
    } catch(e) {
        console.log(e.stack);
    }
}
  if (reason.length < 1) reason = '🚧**Ошибка:*** Отсутствует причина.';
  if (message.mentions.users.size < 1) return message.reply('🚧**Ошибка:** Вы должны упомянуть нарушителя,чтобы замутить.').catch(console.error);
  const embed = new Discord.RichEmbed()
    .setColor(0x00FFFF)
    .setTimestamp()
    .setTitle(`Пользователь замучен:`)
    .addField('Был замучен:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Модератор:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Причина', reason)
    .setFooter(`FelixBot © | Все права защищены.`,`https://miro.medium.com/max/2400/1*pddKd6mxYB878Uc7A8RbOQ.png`);
  message.channel.send({embed})

  if (!message.guild.member(bot.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply(`🚧**Ошибка:** Недостаточно прав! Отстутствует право "Управление ролями" `).catch(console.error);
  let logchannel = message.guild.channels.find('name', 'логи-мутов');
  if (message.guild.member(user).roles.has(muteRole.id)) {
    message.guild.member(user).removeRole(muteRole).then(() => {
      if(!logchannel){
        return
      }else{
      bot.channels.get(logchannel.id).send({embed}).catch(console.error);
      }
    });
  } else {
    message.guild.member(user).addRole(muteRole).then(() => {if(!logchannel){
      return
    }else{
    bot.channels.get(logchannel.id).send({embed}).catch(console.error);
    }
    });
  }

};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['unmute'],
  permLevel: 0
};

module.exports.help = {
  name: 'mute',
  description: 'mutes or unmutes a mentioned user',
  usage: 'un/mute [mention] [reason]'
};
