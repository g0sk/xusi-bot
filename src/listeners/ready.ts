import {Client, GatewayDispatchEvents} from "@discordjs/core";

export default function ready(client: Client): void {
  client.once(GatewayDispatchEvents.Ready, () => {
    console.log(`xusi is online`);
  });
}
