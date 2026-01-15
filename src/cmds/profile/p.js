const { getUser } = require("../../handlers/userHandler");
const { getDisplayRole } = require("../../handlers/permHandler");

module.exports = {
  name: "profile",
  aliases: ["p"],
  category: "profile",

  execute(message) {
    const userData = getUser(message.author.id);
    const member = message.member;

    const role = getDisplayRole(member);

    message.reply(
      `👤 **PROFILE**\n\n` +
      `🆔 User: **${message.author.username}**\n` +
      `🎭 Role: **${role}**\n\n` +
      `💰 Wallet: **R ${userData.wallet}**\n` +
      `🏦 Bank: **R ${userData.bank}**\n` +
      `💎 Net Worth: **R ${userData.wallet + userData.bank}**`
    );
  }
};          name: "BANK",
          value: `R${userData.bank.toLocaleString()}`,
          inline: false
        },
        {
          name: "THE BIO",
          value: userData.bio || "No bio set.",
          inline: false
        }
      )
      .setFooter({
        text: "Re:Zero | Nexus • Royal System"
      })
      .setTimestamp();

    message.reply({ embeds: [embed] });
  }
};
