const { getUser, saveUser } = require("../../handlers/userHandler");

module.exports = {
  name: "deposit",
  aliases: ["dep"],
  category: "economy",

  execute(message, args) {
    const user = getUser(message.author.id);
    const amount = args[0];

    if (!amount) return message.reply("❌ Amount required");

    let value =
      amount === "all" ? user.wallet : parseInt(amount);

    if (isNaN(value) || value <= 0)
      return message.reply("❌ Invalid amount");

    if (user.wallet < value)
      return message.reply("❌ Not enough money");

    user.wallet -= value;
    user.bank += value;
    saveUser(message.author.id, user);

    message.reply(`🏦 Deposited **R ${value}**`);
  }
};
