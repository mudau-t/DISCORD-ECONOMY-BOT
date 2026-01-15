const { getUser, saveUser } = require("../../handlers/userHandler");

module.exports = {
  name: "rob",
  category: "economy",

  execute(message) {
    const target = message.mentions.users.first();
    if (!target) return message.reply("❌ Mention someone");

    const robber = getUser(message.author.id);
    const victim = getUser(target.id);

    if (victim.wallet < 100)
      return message.reply("❌ Target too poor");

    const stolen = Math.floor(Math.random() * 500) + 100;

    victim.wallet -= stolen;
    robber.wallet += stolen;

    saveUser(target.id, victim);
    saveUser(message.author.id, robber);

    message.reply(`🦹 You stole **R ${stolen}**`);
  }
};
