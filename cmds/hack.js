const Discord = module.require("discord.js");
module.exports.run = async (bot,message,args) => {
function doanswer() {
    let answers = ["😛 Взлом не удался","😁 Ха-Ха,удачи в взломе **меня** :P","😅 Ты реально думал,что взломаешь меня? Ха-Ха,наивный)","👾 <Звуки хацкера>","Попробуй в следующей жизни","👻 Колобок повесился,ты следующий","💠 Я слышал где-то обнова должна выйти,ой не тот сценарий,ой то есть 🔫 попытка не удалась",`🔥 Твоя попытка оказалась "Огненной". Твоё устройство горит`,"😈 Устройство слишком слабо для взлома,ваше устройство будет удалено через 15 минут","😈 Мне кажется или вам стучат в дверь?)"]
    return answers[Math.floor(Math.random()*answers.length)];
}

let embed = new Discord.RichEmbed()
  .setColor(0x00FFFF)
  .setTitle("Взламываем...")
  .setDescription(doanswer())
  message.channel.send(embed);

}
module.exports.help = {
    name: "hack"
  };