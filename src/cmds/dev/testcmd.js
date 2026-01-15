const { canTest } = require("../../handlers/permHandler");

module.exports = {
  name: "testcmd",
  category: "dev",

  execute(message) {
    if (!canTest(message.member)) {
      return message.reply(
        "🧪 This command is currently in testing."
      );
    }

    message.reply("✅ You are testing a new command!");
  }
};
