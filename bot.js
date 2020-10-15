
const Discord = require('discord.js');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const request =  require ('request');
const fs = require('fs');
bot.mutes = require('./mutes.json');
let config = require('./botconfig.json');
let token = config.token;
//let prefix = config.prefix
let profile = require('./profile.json');
fs.readdir('./cmds/',(err,files)=>{
    if(err) console.log(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <=0) console.log("Нет комманд для загрузки!!");
    console.log(`Загружено ${jsfiles.length} комманд`);
    jsfiles.forEach((f,i) =>{
        let props = require(`./cmds/${f}`);
        console.log(`${i+1}.${f} Загружен!`);
        bot.commands.set(props.help.name,props);
    });
});


bot.on("ready", () => {
 
    console.log(` FelixBot успешно активирован`);
    bot.user.setPresence({
        status: "dnd",
        game: {
            name: ` 💻Серверов:  ${bot.guilds.size} | !cmds`,
            //name: ` 💻Тех.Работы `,
            type: "PLAYING"
        }
    });
    //bot.guilds.forEach(guild => {
        //guild.channels.first().createInvite()
          //.then(inv => console.log(`${guild.name} | ${inv.url}`));
          // Outputs the guild name + the invite URL
     //});
    

    bot.generateInvite(["ADMINISTRATOR"]).then(link =>{
        console.log(link);
    });
    bot.setInterval(()=>{
        for(let i in bot.mutes){
            let time = bot.mutes[i].time;
            let guildid = bot.mutes[i].guild;
            let guild = bot.guilds.get(guildid);
            let member = guild.members.get(i);
            let muteRole = member.guild.roles.find(r => r.name === "Muted"); 
            if(!muteRole) continue;

            if(Date.now()>= time){
                member.removeRole(muteRole);
                delete bot.mutes[i];
                fs.writeFile('./mutes.json',JSON.stringify(bot.mutes),(err)=>{
                    if(err) console.log(err);
                });
            }
        }

    },5000)

});



bot.on('message', async message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf-8"));
if(!prefixes[message.guild.id]) {
    prefixes[message.guild.id] = {
      prefixes: config.prefix
    };
}

let prefix = prefixes[message.guild.id].prefixes;

    let uid = message.author.id;
    bot.send = function (msg){
        message.channel.send(msg);
    };
    if (!profile[uid]){ //Если нету профиля, создаем
        profile[uid] = {
           warns:0
            };
        };
        let u = profile[uid];


    fs.writeFile('./profile.json',JSON.stringify(profile),(err)=>{
        if(err) console.log(err);
    });
      if(message.content == "!inv")
      {
          message.channel.createInvite({temporary : true})
         .then(inv =>message.channel.send('**Создаю приглашение...**').then(m => m.edit(`Приглашение на данный сервер - https://discord.gg/${inv.code}.
         Внимание! **Срок приглашения - 1 день**`)));                    
      }

    let messageArray = message.content.split(" ");
    let command = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
    if(!message.content.startsWith(prefix)) return;
    let cmd = bot.commands.get(command.slice(prefix.length));
    if(cmd) cmd.run(bot,message,args);
    bot.rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    bot.uId = message.author.id;

});

bot.login(token);