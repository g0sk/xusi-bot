import dotenv from "dotenv";
import {Client, ClientOptions} from "discord.js";
import ready from "./listeners/ready";

dotenv.config();

console.log("Starting bot...");
const client: Client = new Client({
  intents: [],
});

ready(client);
client.login(process.env.token);
