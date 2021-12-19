import type { InjectValueOperation } from '../../../types/operations.ts'
import type { Value } from '../../../types/values.ts'
import parseValue from '../../utilities/parseValue/mod.ts'

export default function getFromCookieStorage(
	operation: InjectValueOperation,
): Value {
	const { path = [] } = operation
	const [name, ...rest] = path

	if (!name) {
		return {} as Value
	}

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
