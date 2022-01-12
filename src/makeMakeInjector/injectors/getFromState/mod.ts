import type {
	Injector,
	InjectValueOperation,
} from "../../../types/operations.ts"
import type { EmptyValue, Value } from "../../../types/values.ts"
import not from "../../../utilities/not/mod.ts"
import parseValue from "../../utilities/parseValue/mod.ts"

export default function getFromState(
	operation: InjectValueOperation,
	// store: Store<StoreConfig>,
): Injector {
	const { path = [] } = operation

	if (not(path.length)) {
		return () => ({} as EmptyValue)
	}

	return function injectValueFromState(): Value {
		const value = "TODO"

		return typeof value === "undefined"
			? ({} as EmptyValue)
			: parseValue(value as string, operation)
	}
}
