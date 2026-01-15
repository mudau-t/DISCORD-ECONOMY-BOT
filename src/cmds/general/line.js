module.exports = {
  name: "line",
  aliases: ["guide", "how"],
  category: "general",

  async execute(message) {
    let page = 0;

    const pages = [
      // PAGE 1
      `📘 **DISCORD GAMBLING BOT – GUIDE (1/5)**

👤 **PROFILE COMMANDS**
• \`.p\` → View your profile
• \`.p @user\` → View another profile
• \`.setbio <text>\` → Set your bio

🎭 **ROLES**
• OWNER → Full access
• GUARD → Protection & moderation
• TESTART → Test new commands
• USER → Normal player

➡️ React ▶️ to continue`,

      // PAGE 2
      `💰 **ECONOMY COMMANDS (2/5)**

💼 **Wallet & Bank**
• \`.wallet\` → View wallet & bank
• \`.balance\` → Check balance

🏦 **Bank System**
• \`.deposit <amount | all>\`
• \`.withdraw <amount | all>\`

➡️ React ▶️ to continue
⬅️ React ◀️ to go back`,

      // PAGE 3
      `🎰 **GAMBLING SYSTEM (3/5)**

🎲 **Games**
• \`.bet <amount | all>\`
• \`.coinflip\`
• \`.dice\`
• \`.8ball <question>\`

⚠️ **Notes**
• Wallet money is used for gambling
• Bank money is safer

➡️ React ▶️ to continue
⬅️ React ◀️ to go back`,

      // PAGE 4
      `🛠️ **EARNING MONEY (4/5)**

💼 **Work & Rewards**
• \`.daily\` → Daily reward
• \`.work\` → Earn random money

🦹 **Risk Commands**
• \`.rob @user\` → Steal money
• Robbing can fail later (planned)

➡️ React ▶️ to continue
⬅️ React ◀️ to go back`,

      // PAGE 5
      `⚙️ **SYSTEM INFO (5/5)**

💱 **Currency**
• All money uses **R (Rands)**

🧪 **TESTART SYSTEM**
• TESTART users can test new commands
• Commands may be unstable

📌 **TIP**
• Use \`.menu\` for command list
• Use \`.line\` to learn how everything works

⬅️ React ◀️ to go back`
    ];

    const msg = await message.reply(pages[page]);

    await msg.react("◀️");
    await msg.react("▶️");
    await msg.react("⏹️");

    const filter = (reaction, user) =>
      ["◀️", "▶️", "⏹️"].includes(reaction.emoji.name) &&
      user.id === message.author.id;

    const collector = msg.createReactionCollector({
      filter,
      time: 120000
    });

    collector.on("collect", reaction => {
      reaction.users.remove(message.author.id);

      if (reaction.emoji.name === "▶️") {
        if (page < pages.length - 1) page++;
      }

      if (reaction.emoji.name === "◀️") {
        if (page > 0) page--;
      }

      if (reaction.emoji.name === "⏹️") {
        collector.stop();
        return;
      }

      msg.edit(pages[page]);
    });

    collector.on("end", () => {
      msg.edit(pages[page] + "\n\n⏱️ *Guide closed*");
    });
  }
};
