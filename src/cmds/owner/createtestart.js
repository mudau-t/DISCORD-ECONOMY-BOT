const { isOwner } = require("../../handlers/permHandler");

module.exports = {
  name: "createtestart",
  category: "owner",

  async execute(message) {
    if (!isOwner(message.author.id))
      return message.reply("❌ Owner only.");

    let role = message.guild.roles.cache.find(
      r => r.name === process.env.TESTART_ROLE
    );

    if (role) return message.reply("🧪 TESTART role already exists.");

    await message.guild.roles.create({
      name: process.env.TESTART_ROLE,
      color: "Blue",
      reason: "Tester role for unreleased commands"
    });

    message.reply("✅ TESTART role created.");
  }
};
