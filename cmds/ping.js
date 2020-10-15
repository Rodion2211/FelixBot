const Discord = module.require("discord.js");

module.exports.run = (client, message) => {
    message.channel.send('Пинг?').then(m => m.edit(`Пинг:\n **Время ответа**: ${message.createdTimestamp - m.createdTimestamp}ms. \n**Сердцебиение**: ${Math.round(client.ping)}ms.`))
  };
  
  module.exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  module.exports.help = {
    name: 'ping',

  };