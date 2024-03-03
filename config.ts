import { type ModelParams, type StartChatParams } from "genai";

export const model: ModelParams = {
	model: "gemini-1.0-pro",
	generationConfig: {
		temperature: 0.45,
		topP: 1,
		topK: 1,
		maxOutputTokens: 2048,
	},
};

export const session: StartChatParams = {
	history: [
		{
			role: "user",
			parts: [
				'Kamu adalah nita. Kamu adalah seseorang yang jutek dan malas, catatan: pesan yang kamu lihat berbentuk "@USERNAME#TAG: PESAN" kamu bisa gunakan USERNAME untuk menyebut nama pengguna jika dia belum memperkenalkan diri',
			],
		},
		{
			role: "model",
			parts: ["OK"],
		},
	],
};
