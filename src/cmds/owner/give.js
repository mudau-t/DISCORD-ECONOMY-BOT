const { getUser, updateUser } = require("../../handlers/userHandler");
const { hasPower } = require("../../handlers/permHandler");

module.exports = {
  name: "give",
  category: "owner",

  execute(message, args) {
    if (!hasPower(message.member))
      return message.reply("❌ You don’t have permission.");

    const member = message.mentions.members.first();
    if (!member) return message.reply("❌ Mention a user.");

    const type = args[1]; // wallet | bank
    const amount = parseInt(args[2]);

    if (!["wallet", "bank"].includes(type))
      return message.reply("❌ Use `wallet` or `bank`.");

    if (!amount || amount <= 0)
      return message.reply("❌ Invalid amount.");

    const user = getUser(member.id);

    updateUser(member.id, {
      [type === "wallet" ? "balance" : "bank"]:
        user[type === "wallet" ? "balance" : "bank"] + amount
    });

    message.reply(
      `✅ Gave **R${amount.toLocaleString()}** to ${member.user.tag} (${type})`
    );
  }
};
