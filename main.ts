import { type ChatSession, GenerativeModel } from "genai";
import { Collection } from "@discordjs/collection";
import {
	Client,
	GatewayDispatchEvents,
	GatewayIntentBits,
	type Snowflake,
} from "@discordjs/core";
import { REST } from "@discordjs/rest";
import { WebSocketManager } from "@discordjs/ws";

import * as config from "./config.ts";

const rest = new REST().setToken(Deno.env.get("DISCORD_TOKEN")!);
const gateway = new WebSocketManager({
	intents: GatewayIntentBits.Guilds | GatewayIntentBits.GuildMessages |
		GatewayIntentBits.MessageContent,
	rest,
	token: Deno.env.get("DISCORD_TOKEN")!,
});
const client = new Client({ rest, gateway });

const model = new GenerativeModel(Deno.env.get("GENAI_API_KEY")!, config.model);

const sessions = new Collection<Snowflake, ChatSession>();
const timeouts = new Collection<Snowflake, number>();

client.on(
	GatewayDispatchEvents.MessageCreate,
	async ({ api, data: message }) => {
		const channelId = message.channel_id;
		const session = sessions.get(channelId) ??
			await model.startChat(config.session);
		const timeout = timeouts.get(channelId);

		if (
			!message.author.bot && message.content &&
			(message.mentions.some((entity) =>
				entity.id === Deno.env.get("DISCORD_ID")
			) || timeout)
		) {
			await api.channels.showTyping(channelId);

			try {
				const response = await session.sendMessage(
					`@${message.author.username}#${message.author.discriminator}: ${
						message.content.replaceAll(
							new RegExp(
								`<@?!${Deno.env.get("DISCORD_ID")}>`,
								"g",
							),
							"@Nita",
						)
					}`,
				);

				await api.channels.createMessage(channelId, {
					content: response.response.text(),
					message_reference: { message_id: message.id },
				});
			} catch (_err) {
				await api.channels.deleteMessage(channelId, message.id);
			}

			if (timeout) clearTimeout(timeout);
			timeouts.set(
				channelId,
				setTimeout(() => timeouts.delete(channelId), 20_000),
			);

			sessions.set(channelId, session);
		}
	},
);

gateway.connect();
