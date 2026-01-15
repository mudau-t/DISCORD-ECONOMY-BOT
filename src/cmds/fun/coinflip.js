module.exports = {
  name: "coinflip",
  aliases: ["cf"],
  category: "fun",

  execute(message) {
    const result = Math.random() < 0.5 ? "HEADS" : "TAILS";
    message.reply(`🪙 Result: **${result}**`);
  }
};
