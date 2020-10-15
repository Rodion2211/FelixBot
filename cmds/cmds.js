const Discord = module.require("discord.js");


module.exports.run = async (bot, message, args, level) => {
    let embed1 = new Discord.RichEmbed()
    .setTitle('Комманды бота: (Страница 1) ')
    .setColor('#e22216')
    .setAuthor(`${bot.user.username}`, `${bot.user.avatarURL}`)
    .setDescription(`
    **Команды категории "Модерация":**

     !warn / Участник - Предупреждение игрока. (3 максимум,далее кик)
     !ban / Участник - Бан участника.
     !mute / Участник - Мут участника.
     !kick / Участник - Кик участника.
     !unmute / Участник - Снимает мут с участника.
     !unwarn / Участник - Снимает один варн с участника.
     !votekick / Участник - Голосование за кик участника.  **Новое!**

     **Команды категории "Информация":**

     !serverinfo - Информация о сервере.
     !ping - Пинг бота. (Скорость ответа на команды)
     !inst / Имя профиля - Показывает информацию о странице в инстаграме.
     !botstats - Показывает статистику бота.
     !inv - Приглашение на данный сервер (Приглашение действует один день)
     !cmds - Комманды бота **Обновлено!**

     🚧 !help - Вспомогательная информация о боте. **Команда в разработке!**

    `)
    .setFooter(`FelixBot © | Все права защищены.`,`https://miro.medium.com/max/2400/1*pddKd6mxYB878Uc7A8RbOQ.png`);
    message.channel.send(embed1);
    let embed2 = new Discord.RichEmbed()
    .setTitle('Комманды бота: (Страница 2) ')
    .setColor('#e22216')
    .setAuthor(`${bot.user.username}`, `${bot.user.avatarURL}`)
    .setDescription(`**Команды категории "Развлечение":**

    !anime - Случайные фото из **Аниме** вселенных.
    !duck - Рандомная фотография уток.
    !dog - Случайное фото собак.
    !bunny - Рандомная фотография кроликов.

    **Команды категории "Прочее":**

    !reload / команда - Перезапуск команды.
    Для разработчиков кода.
    !clear / кол-во - Удаляет определённое количество сообщений из чата.
    Возраст сообщений не должен превышать 14-ти дней!
    !say / текст - Пишет определённый простой текст от своего лица. 
    `)
    .setFooter(`FelixBot © | Все права защищены.`,`https://miro.medium.com/max/2400/1*pddKd6mxYB878Uc7A8RbOQ.png`);
    message.channel.send(embed2);
};
module.exports.help = {
  name: "cmds"
};