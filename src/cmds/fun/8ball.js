const replies = [
  "Yes", "No", "Maybe", "Definitely", "Never", "Ask later"
];

module.exports = {
  name: "8ball",
  category: "fun",

  execute(message) {
    const answer =
      replies[Math.floor(Math.random() * replies.length)];

    message.reply(`🎱 ${answer}`);
  }
};
