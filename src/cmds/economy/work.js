const { getUser, saveUser } = require("../../handlers/userHandler");

module.exports = {
  name: "work",
  category: "economy",

  execute(message) {
    const user = getUser(message.author.id);
    const earn = Math.floor(Math.random() * 800) + 200;

    user.wallet += earn;
    saveUser(message.author.id, user);

    message.reply(`🛠️ You earned **R ${earn}**`);
  }
};
