const { updateUser } = require("../../handlers/userHandler");

module.exports = {
  name: "setbio",
  category: "profile",

  execute(message, args) {
    const bio = args.join(" ");

    if (!bio)
      return message.reply("❌ Please provide a bio.");

    if (bio.length > 120)
      return message.reply("❌ Bio must be under 120 characters.");

    updateUser(message.author.id, { bio });

    message.reply("✅ Your bio has been updated!");
  }
};
