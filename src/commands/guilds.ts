import {
  SlashCommandBuilder,
  SharedSlashCommandOptions,
} from "@discordjs/builders";
import {Client} from "@discordjs/core";

/**
 * Creates a slash command
 */
const createSlashCommand = () => {
  const command = new SlashCommandBuilder()
    .setName("Guilds")
    .setDescription("Get a list of guilds the bot is in")
    .toJSON();
  return command.toJSON();
};

export default createSlashCommand;
