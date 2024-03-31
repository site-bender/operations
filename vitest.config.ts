import { defineConfig } from "vitest/config"

export default defineConfig({
	test: {
		coverage: {
			exclude: ["temp/**", "lib/main.ts"],
			include: ["lib/**", "src/**"],
			provider: "v8",
		},
	},
})
