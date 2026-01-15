const { getUser, updateUser } = require("../../handlers/userHandler");

module.exports = {
  name: "daily",
  category: "economy",

  execute(message) {
    const user = getUser(message.author.id);
    const now = Date.now();
    const DAY = 24 * 60 * 60 * 1000;

    if (now - user.lastDaily < DAY) {
      const left = DAY - (now - user.lastDaily);
      const hours = Math.ceil(left / (1000 * 60 * 60));

      return message.reply(
        `⏳ You already claimed your daily.\n` +
        `Come back in **${hours}h**`
      );
    }

    const reward = 1000;

    updateUser(message.author.id, {
      balance: user.balance + reward,
      lastDaily: now
    });

    message.reply(
      `🎁 **Daily Reward Claimed!**\n` +
      `You received **R${reward.toLocaleString()}**`
    );
  }
}; 
