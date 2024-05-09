import { defineConfig } from "vitest/config"

export default defineConfig({
	test: {
		environment: "jsdom",
		coverage: {
			exclude: [
				"temp/**",
				"index.ts",
				"lib/constants.ts",
				"lib/test**",
				"lib/makeConditional/operators/algebraic/index.ts",
				"lib/makeCalculator/index.ts",
				"lib/makeInjector/index.ts",
				"lib/old/**",
			],
			include: ["lib/**"],
			provider: "v8",
		},
	},
})
