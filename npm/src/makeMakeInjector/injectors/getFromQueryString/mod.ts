import { Injector, InjectValueOperation } from '../../../types/operations.js'
import { Value } from '../../../types/values.js'
import not from '../../../utilities/not/mod.js'
import parseValue from '../../utilities/parseValue/mod.js'
import stringToMap from '../../utilities/stringToMap/mod.js'

export default function getFromQueryString(
	operation: InjectValueOperation,
	useRouter: () => { location: Record<string, string>; path: Array<string> },
): Injector {
	const router = useRouter()
	const { path = [] } = operation
	const [name] = path

	if (not(name)) {
		return () => ({})
	}

	return function injectValueFromQueryString(): Value {
		const queryValue = stringToMap(router.location.queryString, '&', '=').get(
			name,
		)

		if (queryValue == null) {
			return {} as Value
		}

		return parseValue(String(queryValue), operation)
	}
}
