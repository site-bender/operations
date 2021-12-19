import { Injector, InjectValueOperation } from '../../../types/operations.js'
import { Value } from '../../../types/values.js'
import not from '../../../utilities/not/mod.js'
import parseValue from '../../utilities/parseValue/mod.js'

export default function getFromUrlParams(
	operation: InjectValueOperation,
	useRoute: () => { params: Record<string, string> },
): Injector {
	const { params = {} } = useRoute()
	const { path = [] } = operation
	const [name] = path

	if (not(name)) {
		return () => ({})
	}

	return function injectValueFromUrlParams(): Value {
		const paramValue = name ? params[name] : ''

		return parseValue(paramValue, operation)
	}
}
