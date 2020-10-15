const Discord = module.require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args, level) => {
  
 if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send(`🚧**Ошибка:** Недостаточно прав! Отстутствует право "Управление сервером"`)
 if(!args[0] || args[0 == "help"]) return message.channel.send(`Использование команды: !prefix префикс (который вы хотите поставить)`);

 let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf-8"));

 prefixes[message.guild.id] = {
     prefixes: args[0]
 };

 fs.writeFile("./prefixes.json", JSON.stringify(prefixes),(err) => {
     if (err) console.log(err)
 });

 let embed = new Discord.RichEmbed()
 .setColor("#FF9900")
 .setTitle("Префикс изменён!")
 .setAuthor(`${bot.user.username}`, `${bot.user.avatarURL}`)
 .setDescription(`Префикс для данного сервера был изменён на **${args[0]}**`)
 .setFooter(`FelixBot © | Все права защищены.`,`https://miro.medium.com/max/2400/1*pddKd6mxYB878Uc7A8RbOQ.png`);
 message.channel.send(embed);



};
module.exports.help = {
  name: "prefix"
};