const { getUser, saveUser } = require("../../handlers/userHandler");

module.exports = {
  name: "withdraw",
  aliases: ["wd"],
  category: "economy",

  execute(message, args) {
    const user = getUser(message.author.id);
    const amount = args[0];

    if (!amount) return message.reply("❌ Amount required");

    let value =
      amount === "all" ? user.bank : parseInt(amount);

    if (isNaN(value) || value <= 0)
      return message.reply("❌ Invalid amount");

    if (user.bank < value)
      return message.reply("❌ Not enough money");

    user.bank -= value;
    user.wallet += value;
    saveUser(message.author.id, user);

    message.reply(`💰 Withdrawn **R ${value}**`);
  }
};
