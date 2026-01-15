const { getUser, updateUser } = require("../../handlers/userHandler");

module.exports = {
  name: "bet",
  category: "economy",

  execute(message, args) {
    const amount = parseInt(args[0]);
    const user = getUser(message.author.id);

    if (!amount || amount <= 0)
      return message.reply("❌ Enter a valid amount.");

    if (amount > user.balance)
      return message.reply("❌ You don’t have enough Rands.");

    const win = Math.random() < 0.5;

    if (win) {
      updateUser(message.author.id, {
        balance: user.balance + amount
      });

      message.reply(`🎉 You **won R${amount.toLocaleString()}**!`);
    } else {
      updateUser(message.author.id, {
        balance: user.balance - amount
      });

      message.reply(`💀 You **lost R${amount.toLocaleString()}**.`);
    }
  }
}; 
