import type { Store } from 'solid-js/store'
import type { StoreConfig } from '../..'
import type { Injector, InjectValueOperation } from '../../types/operations'
import { EmptyValue, Value } from '../../types/values'
import not from '../../utilities/not'
import parseValue from '../utilities/parseValue'

export default function getFromState(
	operation: InjectValueOperation,
	store: Store<StoreConfig>,
): Injector {
	const { path = [] } = operation

	if (not(path.length)) {
		return () => ({} as EmptyValue)
	}

	return function injectValueFromState(): Value {
		const value = path.reduce(
			(state, key) => {
				return typeof state === 'object' && key in state ? state[key] : state
			},
			{ ...store.interfaces },
		)

		return typeof value === 'undefined'
			? ({} as EmptyValue)
			: parseValue(value as string, operation)
	}
}
