const Discord = require('discord.js');
const bot = new Discord.Client();
let { version } = require("discord.js");
let statsmoment = require("moment");
require("moment-duration-format");

module.exports.run = async (bot,message,args) => {
    function duration(ms) {
        const sec = Math.floor((ms / 1000 ) % 60).toString()
        const min = Math.floor((ms / (1000 * 60)) % 60 ).toString()
        const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
        const days = Math.floor((ms /(1000 * 60 * 60 *24)) % 60).toString()
        return `${days.padStart(1, '0')} дней, ${hrs.padStart(1, '0')} часов, ${min.padStart(2, '0')} минут, ${sec.padStart(2, '0')} секунд, `
    }

message.channel.send({embed: {
color: 3447003,
author: {
name: bot.user.username,
icon_url: bot.user.avatarURL
},
title: "Статистика:",
fields: [
{ name: ":fire: Размер приложения:", value: `**${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB**`, inline: true},
{ name: "🔧 Аптайм бота:", value: `**${duration(bot.uptime)}**` , inline: true},
{ name: ":speech_balloon: Количество серверов:  ", value: `**${bot.guilds.size.toLocaleString()}**`, inline: true},
{ name: ":runner: Пользователей:", value: `**${bot.users.size.toLocaleString()}**`, inline: true},
{ name: ":incoming_envelope: Версия Discord.js", value: `**v${version}**`, inline: true},
{ name: ":white_check_mark: Версия Node.js", value: `**${process.version}**`, inline: true},
],
timestamp: new Date(),
footer: {
icon_url: bot.user.avatarURL,
text: "FelixBot © | Все права защищены."
}
}
})
}
module.exports.help = {
    name: "botstats"
};