import { Injector, InjectValueOperation } from '../../../types/operations.js'
import { Value } from '../../../types/values.js'
import not from '../../../utilities/not/mod.js'
import parseValue from '../../utilities/parseValue/mod.js'

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
