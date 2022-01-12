import type {
	Injector,
	InjectValueOperation,
} from "../../../types/operations.ts"
import type { Value } from "../../../types/values.ts"
import not from "../../../utilities/not/mod.ts"
import parseValue from "../../utilities/parseValue/mod.ts"

export default function getFromUrlParams(
	operation: InjectValueOperation,
	useRoute: () => { params: Record<string, string> },
): Injector {
	const { params = {} } = useRoute()
	const { path = [] } = operation
	const [name] = path

	if (not(name)) {
		return () => ({ datatype: "undefined", value: undefined })
	}

	return function injectValueFromUrlParams(): Value {
		const paramValue = name ? params[name] : ""

		return parseValue(paramValue, operation)
	}
}
