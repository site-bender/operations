import { Injector, InjectValueOperation } from '../../types/operations'
import { Value } from '../../types/values'
import not from '../../utilities/not'
import parseValue from '../utilities/parseValue'

export default function getFromSessionStorage(
	operation: InjectValueOperation,
): Injector {
	const { path = [] } = operation
	const [name, ...rest] = path

	if (not(name)) {
		return () => ({})
	}

	return function injectValueFromSessionStorage(): Value {
		const storedValue = sessionStorage.getItem(name)

		if (storedValue == null) {
			return {}
		}

		try {
			const parsed = JSON.parse(storedValue)
			const value = rest.length
				? rest.reduce((obj, key) => obj?.[key], parsed)
				: parsed

			return parseValue(value, operation)
		} catch (e) {
			return parseValue(storedValue, operation)
		}
	}
}
