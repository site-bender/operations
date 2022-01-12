import { build } from "https://deno.land/x/dnt/mod.ts"
import type { BuildOptions } from "https://deno.land/x/dnt/mod.ts?dts"

await build({
	entryPoints: ["./src/mod.ts"],
	outDir: "./npm",
	shims: {
		deno: true,
	},
	package: {
		name: "@sitebender/operations",
		version: Deno.args[0],
		description:
			"A library for validation, formatting, and operations in Sitebender components.",
		license: "MIT",
		repository: {
			type: "git",
			url: "git+https://github.com/site-bender/operations.git",
		},
		bugs: {
			url: "https://github.com/site-bender/operations/issues",
		},
	},
	mappings: {
		[`https://cdn.skypack.dev/@js-temporal/polyfill?dts`]: {
			name: "@js-temporal/polyfill",
			version: "0.3.0",
		},
		[`'https://cdn.skypack.dev/@formatjs/intl-listformat?dts'`]: {
			name: "@formatjs/intl-listformat",
			version: "6.3.6",
		},
	},
} as BuildOptions)

// post build steps
Deno.copyFileSync("LICENSE", "npm/LICENSE")
Deno.copyFileSync("README.md", "npm/README.md")
