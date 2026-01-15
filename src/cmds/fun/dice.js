module.exports = {
  name: "dice",
  category: "fun",

  execute(message) {
    const roll = Math.floor(Math.random() * 6) + 1;
    message.reply(`🎲 You rolled **${roll}**`);
  }
};
