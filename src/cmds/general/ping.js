module.exports = {
  name: "ping",
  category: "general",

  execute(message) {
    const latency = Date.now() - message.createdTimestamp;

    message.reply(
      `🏓 **Pong!**\n` +
      `Message latency: **${latency}ms**`
    );
  }
};
