import type {
	Injector,
	InjectValueOperation,
} from '../../../types/operations.js'
import { EmptyValue, Value } from '../../../types/values.js'
import not from '../../../utilities/not/mod.js'
import parseValue from '../../utilities/parseValue/mod.js'

export default function getFromState(
	operation: InjectValueOperation,
	// store: Store<StoreConfig>,
): Injector {
	const { path = [] } = operation

	if (not(path.length)) {
		return () => ({} as EmptyValue)
	}

	return function injectValueFromState(): Value {
		const value = 'TODO'

		return typeof value === 'undefined'
			? ({} as EmptyValue)
			: parseValue(value as string, operation)
	}
}
