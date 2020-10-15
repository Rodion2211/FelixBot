const Discord = module.require("discord.js");
const botconfig = require("../botconfig.json");
const bot = new Discord.Client();


module.exports.run = async (bot,message,args) => {
    if(message.author.id != "468111498137305090") return message.channel.send(`🚧**Ошибка:** Недостаточно прав! Доступ только разработчику бота. `)

    if(!args[0]) return message.channel.send("🚧**Ошибка:** Пожалуйста выбери команду для перезагрузки")


let commandName = args[0].toLowerCase()
    
    try {
        delete require.cache[require.resolve(`./${commandName}.js`)]
        bot.commands.delete(commandName)
        const pull = require(`./${commandName}.js`)
        bot.commands.set(commandName, pull)
    } catch(e) {
        return message.channel.send(`🚧**Ошибка:** Не удалось перезагрузить: \`${args[0].toUpperCase()}\``)
    }
    let embed = new Discord.RichEmbed()
    .setTitle("Перезагрузка...")
    .setColor('#e22216')
    .setAuthor(`${bot.user.username}`, `${bot.user.avatarURL}`)
    .setDescription(`Команда **!${commandName}** была перезагружена!`)
    .setFooter(`FelixBot © | Все права защищены.`,`https://miro.medium.com/max/2400/1*pddKd6mxYB878Uc7A8RbOQ.png`);
     message.channel.send(embed);
    message.delete();
    message.channel.stopTyping()

}
module.exports.help = {
    name: "reload",
};