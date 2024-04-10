import { defineConfig } from "vitest/config"

export default defineConfig({
	test: {
		coverage: {
			exclude: [
				"temp/**",
				"index.ts",
				"lib/test**",
				"lib/mathematical/index.ts",
				"lib/injectors/index.ts",
				"lib/booleans/index.ts",
				"lib/fp/predicates/index.ts",
				"lib/fp/functions/index.ts",
				"lib/logical/index.ts",
				"lib/string/index.ts",
			],
			include: ["lib/**", "src/**"],
			provider: "v8",
		},
	},
})
