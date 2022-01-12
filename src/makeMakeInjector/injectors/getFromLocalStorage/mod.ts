import type {
	Injector,
	InjectValueOperation,
} from "../../../types/operations.ts"
import type { Value } from "../../../types/values.ts"
import not from "../../../utilities/not/mod.ts"
import parseValue from "../../utilities/parseValue/mod.ts"

export default function getFromLocalStorage(
	operation: InjectValueOperation,
): Injector {
	const { path = [] } = operation
	const [name, ...rest] = path

	if (not(name)) {
		return () => ({ datatype: "undefined", value: undefined })
	}

	return function injectValue(): Value {
		const storedValue = localStorage.getItem(name)

		if (storedValue == null) {
			return {} as Value
		}

		try {
			const parsed = JSON.parse(storedValue)
			const value = rest.length
				? rest.reduce((obj, key) => obj?.[key], parsed)
				: parsed

			return parseValue(value, operation)
		} catch (err) {
			console.log(err)
			return parseValue(storedValue, operation)
		}
	}
}
