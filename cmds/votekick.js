const Discord  = require('discord.js');

const agree    = "✅";
const disagree = "❎";

module.exports.run = async (bot, message, args) => {

  if (message.mentions.users.size === 0){
    return message.reply(`🚧**Ошибка:** Отсутствует пинг. `);
  }

  let kickmember = message.guild.member(message.mentions.users.first());
  if(!kickmember){
    message.reply("🚧**Ошибка:** " + "| That User Does Not Seem Valid!");
  }

  if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")){
    return message.reply(`🚧**Ошибка:** Недостаточно прав! Отстутствует право "Кик участников" `).catch(console.error);
  }

  let msg = await message.channel.send(`Голосование на кик  ${message.mentions.users.first().username}${message.mentions.users.first().discriminator}. Голосование длится **1 минуту**.`);
  await msg.react(agree);
  await msg.react(disagree);

  const reactions = await msg.awaitReactions(reaction => reaction.emoji.name === agree || reaction.emoji.name === disagree, {time: 60000});
  msg.delete();

  var NO_Count = reactions.get(disagree).count;
  var YES_Count = reactions.get(agree);

  if(YES_Count == undefined){
    var YES_Count = 3;
  }else{
    var YES_Count = reactions.get(agree).count;
  }

  var sumsum = new Discord.RichEmbed()
            .setTitle("Голосование завершено:")
            .setAuthor(`${bot.user.username}`, `${bot.user.avatarURL}`)
            .setDescription(`Всего голосов (За кик) - **${YES_Count-1}**
                             Всего голосов (Против кика) - **${NO_Count-1}**
                             
                             Необходимо для кика - **4 и более**`)

            .setColor("0x#FF0000")
            .setFooter(`FelixBot © | Все права защищены.`,`https://miro.medium.com/max/2400/1*pddKd6mxYB878Uc7A8RbOQ.png`);
  await message.channel.send({embed: sumsum});

  if(YES_Count >= 4 && YES_Count > NO_Count){

    kickmember.kick().then(member => {
    })
  }else{

    message.channel.send("\n" + "Пользователь не был кикнут,из-за недостаточных голосов");
  }

}

module.exports.help = {
    name: "votekick"
};