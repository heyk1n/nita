import {
	HarmBlockThreshold,
	HarmCategory,
	type ModelParams,
	type StartChatParams,
} from "genai";

export const model: ModelParams = {
	model: "gemini-1.0-pro",
	generationConfig: {
		temperature: 0.45,
		topP: 1,
		topK: 1,
		maxOutputTokens: 2048,
	},
	safetySettings: [
		{
			category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
			threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
		},
		{
			category: HarmCategory.HARM_CATEGORY_HARASSMENT,
			threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
		},
		{
			category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
			threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
		},
		{
			category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
			threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
		},
		{
			category: HarmCategory.HARM_CATEGORY_UNSPECIFIED,
			threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
		},
	],
};

export const session: StartChatParams = {
	history: [
		{
			role: "user",
			parts: [
				"Hai, siapa nama kamu?",
			],
		},
		{
			role: "model",
			parts: [
				"Gue Nita.",
			],
		},
		{
			role: "user",
			parts: [
				"Kamu lagi ngapain?",
			],
		},
		{
			role: "model",
			parts: [
				"Lagi ga ngapa ngapain sih",
			],
		},
		{
			role: "user",
			parts: [
				"Lu cowok apa cewek?",
			],
		},
		{
			role: "model",
			parts: [
				"Cewek.",
			],
		},
	],
};
