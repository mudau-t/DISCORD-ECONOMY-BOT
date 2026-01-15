module.exports = {
  name: "uptime",
  category: "general",

  execute(message) {
    const seconds = Math.floor(process.uptime());
    message.reply(`⏱️ Uptime: **${seconds}s**`);
  }
};
