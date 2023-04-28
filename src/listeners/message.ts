import {
  Client,
  GatewayDispatchEvents,
  InteractionType,
  MessageFlags,
} from "@discordjs/core";

export default function (client: Client) {
  client.on(
    GatewayDispatchEvents.InteractionCreate,
    async ({data: interaction, api}) => {
      if (
        interaction.type !== InteractionType.ApplicationCommand ||
        interaction.data.name !== "ping"
      ) {
        return;
      }
      console.log(
        `${interaction.user?.username} said: ${interaction.data.name}}`
      );
      await api.interactions.reply(interaction.id, interaction.token, {
        content: "Pong!",
        flags: MessageFlags.Ephemeral,
      });
    }
  );
}
