import { InjectValueOperation } from '../../../types/operations'
import { Value } from '../../../types/values'
import parseValue from '../../utilities/parseValue'

export default function getFromCookieStorage(
	operation: InjectValueOperation,
): Value {
	const { path = [] } = operation
	const [name, ...rest] = path

	if (!name) {
		return {}
	}

	const storedValue = localStorage.getItem(name)

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
