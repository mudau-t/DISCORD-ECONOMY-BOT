const { getUser } = require("../../handlers/userHandler");

module.exports = {
  name: "wallet",
  aliases: ["bal", "r"],
  category: "economy",

  execute(message) {
    const user = getUser(message.author.id);

    message.reply(
      `💰 **Wallet**\n` +
      `R${user.balance.toLocaleString()}`
    );
  }
};
