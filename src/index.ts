import {
  Client,
  GatewayDispatchEvents,
  GatewayIntentBits,
} from "@discordjs/core";
import {REST} from "@discordjs/rest";
import {WebSocketManager} from "@discordjs/ws";
import {env} from "./env";

console.log("Starting bot...");

// Create REST and WebSocket managers directly
const rest = new REST({version: "10"}).setToken(env.DISCORD_TOKEN);
const ws = new WebSocketManager({
  token: env.DISCORD_TOKEN,
  intents:
    GatewayIntentBits.GuildMessages |
    GatewayIntentBits.MessageContent |
    GatewayIntentBits.Guilds,
  rest,
});

// Create a client to emit relevant events.
const client: Client = new Client({rest, ws});

client.on(GatewayDispatchEvents.MessageCreate, ({data: interaction, api}) => {
  console.log(
    `Message sent by ${interaction.author.username}: "${interaction.content}"`
  );
});

// Listen for the ready event
client.once(GatewayDispatchEvents.Ready, ({data, api}) => {
  console.log(`${data.user.username} bot is ready! (using API v${data.v})`);
});

// Start the WebSocket connection.
ws.connect();
