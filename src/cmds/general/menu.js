module.exports = {
  name: "menu",
  aliases: ["help"],
  category: "general",

  execute(message) {
    const commands = message.client.commands;

    const categories = {};

    // Group commands by category
    commands.forEach(cmd => {
      const cat = cmd.category || "other";
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(cmd);
    });

    let text = "📜 **DISCORD GAMBLING BOT – MENU**\n\n";

    for (const [category, cmds] of Object.entries(categories)) {
      text += `**${category.toUpperCase()}**\n`;

      cmds.forEach(cmd => {
        const aliasText = cmd.aliases?.length
          ? ` (${cmd.aliases.join(", ")})`
          : "";
        text += `• ${cmd.name}${aliasText}\n`;
      });

      text += "\n";
    }

    message.reply(text);
  }
};
