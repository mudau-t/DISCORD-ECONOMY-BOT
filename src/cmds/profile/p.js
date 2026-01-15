const { EmbedBuilder } = require("discord.js");
const { getUser } = require("../../handlers/userHandler");
const { isOwner, isGuard } = require("../../handlers/permHandler");

module.exports = {
  name: "p",
  aliases: ["profile"],
  category: "profile",

  execute(message) {
    const member =
      message.mentions.members.first() || message.member;

    const userData = getUser(member.id);

    let role = "USER";
    if (isOwner(member.id)) role = "OWNER";
    else if (isGuard(member)) role = "GUARD";

    const embed = new EmbedBuilder()
      .setColor("#FFD700")
      .setAuthor({
        name: "Re:Zero Profile",
        iconURL: member.user.displayAvatarURL({ dynamic: true })
      })
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setDescription("**Official Re:Zero | Nexus user profile**")
      .addFields(
        { name: "NAME", value: member.user.username, inline: false },
        { name: "ROLE", value: role, inline: false },
        {
          name: "WALLET",
          value: `R${userData.balance.toLocaleString()}`,
          inline: false
        },
        {
          name: "BANK",
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
