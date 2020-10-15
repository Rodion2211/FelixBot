const Discord = module.require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
module.exports.run = async (bot,message,args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`🚧**Ошибка:** Недостаточно прав! Отстутствует право "Управление сообщениями" `);
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!args[0]) return bot.send("🚧**Ошибка:** Вы не указали пользователя! Используйте пинг для команды.");
    if(!rUser) return bot.send("🚧**Ошибка:** Пользователь не найден");
    
    let role = message.guild.roles.find(r => r.name === "Muted");
    if(!rUser.roles.has(role.id)) return bot.send("🚧**Ошибка:** Этот пользователь не имеет мута.");
    if(!role){
        role = await message.guild.createRole({
            name:"Muted",
            permissions:[]
        });
        message.guild.channels.forEach(async (channel,id) => {
            await channel.overwritePermissions(role,{
                SEND_MESSAGES:false,
                ADD_REACTIONS:false
            });
        });
    };
    delete bot.mutes[rUser.id];
    fs.writeFile('./mutes.json',JSON.stringify(bot.mutes),(err)=>{
        if(err) console.log(err);
    });

    rUser.removeRole(role);
};
module.exports.help = {
    name: "unmute"
};