import type {
	Injector,
	InjectValueOperation,
} from '../../../types/operations.ts'
import type { Value } from '../../../types/values.ts'
import not from '../../../utilities/not/mod.ts'
import parseValue from '../../utilities/parseValue/mod.ts'
import stringToMap from '../../utilities/stringToMap/mod.ts'

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
