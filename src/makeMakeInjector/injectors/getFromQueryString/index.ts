import { useRouter } from '@rturnq/solid-router'
import { Injector, InjectValueOperation } from '../../types/operations'
import { Value } from '../../types/values'
import not from '../../utilities/not'
import parseValue from '../utilities/parseValue'
import stringToMap from '../utilities/stringToMap'

export default function getFromQueryString(
	operation: InjectValueOperation,
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
			return {}
		}

		return parseValue(String(queryValue), operation)
	}
}
