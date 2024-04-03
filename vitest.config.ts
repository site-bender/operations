import { defineConfig } from "vitest/config"

export default defineConfig({
	test: {
		coverage: {
			exclude: ["temp/**", "lib/main.ts", "lib/test**"],
			include: ["lib/**", "src/**"],
			provider: "v8",
		},
	},
})
