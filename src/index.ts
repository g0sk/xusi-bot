import dotenv from "dotenv";
import {
  Client,
  GatewayDispatchEvents,
  GatewayIntentBits,
} from "@discordjs/core";
import {REST} from "@discordjs/rest";
import {WebSocketManager} from "@discordjs/ws";

dotenv.config();

console.log("Starting bot...");

let token: string;

if (!process.env.DISCORD_TOKEN) {
  console.error("DISCORD_TOKEN not found in .env file");
  throw new Error("Environment variables not provided");
} else {
  token = process.env.DISCORD_TOKEN;
}

// Create REST and WebSocket managers directly
const rest = new REST({version: "10"}).setToken(token);
const ws = new WebSocketManager({
  token,
  intents:
    GatewayIntentBits.GuildMessages |
    GatewayIntentBits.MessageContent |
    GatewayIntentBits.Guilds,
  rest,
});

// Create a client to emit relevant events.
const client = new Client({rest, ws});

// Listen for interactions
// Each event contains an `api` prop along with the event data that allows you to interface with the Discord REST API

client.on(GatewayDispatchEvents.MessageCreate, async ({api, data}) => {
  if (data.content !== "ping") {
    return;
  }

  await api.channels.createMessage(data.channel_id, {content: "pong"});
});

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
