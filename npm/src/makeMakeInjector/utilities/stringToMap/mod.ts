import { Maps } from "../../../types/values.js"
import not from "../../../utilities/not/mod.js"

export default function stringToMap(
	value: string,
	separator: string | RegExp = ",",
	keyValueSeparator: string | RegExp = ":",
): Maps {
	const obj: Record<string, string> = value
		.split(separator)
		.reduce((acc, v) => {
			const [key, value] = v.split(keyValueSeparator)

			return not(key)
				? acc
				: {
					...acc,
					[key]: value,
				}
		}, {})

	return new Map(Object.entries(obj)) as Maps
}
