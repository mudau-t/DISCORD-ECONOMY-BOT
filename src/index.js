require("dotenv").config();

const fs = require("fs");
const path = require("path");
const {
  Client,
  GatewayIntentBits,
  Collection
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.commands = new Collection();
const PREFIX = process.env.PREFIX || ".";

/* -------------------- LOAD COMMANDS (RECURSIVE) -------------------- */

const cmdsPath = path.join(__dirname, "cmds");

function loadCommands(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);

    if (fs.statSync(fullPath).isDirectory()) {
      loadCommands(fullPath);
    } else if (file.endsWith(".js")) {
      const command = require(fullPath);

      if (!command.name) {
        console.warn(`⚠️ Command missing name: ${fullPath}`);
        continue;
      }

      client.commands.set(command.name, command);
    }
  }
}

loadCommands(cmdsPath);

/* -------------------- MESSAGE HANDLER -------------------- */

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content
    .slice(PREFIX.length)
    .trim()
    .split(/\s+/);

  const cmdName = args.shift().toLowerCase();

  const command =
    client.commands.get(cmdName) ||
    client.commands.find(
      cmd => cmd.aliases && cmd.aliases.includes(cmdName)
    );

  if (!command) return;

  try {
    command.execute(message, args);
  } catch (err) {
    console.error(err);
    message.reply("❌ An error occurred while executing this command.");
  }
});

/* -------------------- READY -------------------- */

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.login(process.env.TOKEN); 
