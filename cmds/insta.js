const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const Discord = module.require("discord.js");

const fetch = require("node-fetch");
module.exports.run = async (bot, message, args) => {
        const name = args.join(" ");

        if (!name) {
            return message.reply("🚧**Ошибка:** Введите ник пользователя! (В сслыке на профиль)")
                .then(m => m.delete(5000));
        }

        const url = `https://instagram.com/${name}/?__a=1`;
        
        let res; 

        try {
            res = await fetch(url).then(url => url.json());
        } catch (e) {
            return message.reply("🚧**Ошибка:** Пользователь не найден! Проверьте,правильно-ли вы ввели ник")
                .then(m => m.delete(5000));
        }

        const account = res.graphql.user;

        const embed = new RichEmbed()
            .setColor("RANDOM")
            .setAuthor(`${bot.user.username}`, `${bot.user.avatarURL}`)
            .setTitle(account.full_name)
            .setURL(`https://instagram.com/${name}`)
            .setThumbnail(account.profile_pic_url_hd)
            .addField("Информация о профиле", stripIndents`**- Имя:** ${account.username}
            **- Полное имя:** ${account.full_name}
            **- Описание:** ${account.biography.length == 0 ? "none" : account.biography}
            **- Количество постов:** ${account.edge_owner_to_timeline_media.count}
            **- Количество подписчиков:** ${account.edge_followed_by.count}
            **- Приватный аккаунт:** ${account.is_private ? "Да 🔐" : "Нет 🔓"}`)
            .setFooter(`FelixBot © | Все права защищены.`,`https://miro.medium.com/max/2400/1*pddKd6mxYB878Uc7A8RbOQ.png`);

        message.channel.send(embed);
    }
    module.exports.help = {
        name: "inst"
      };