import { TypeOfSource } from '../types/enums.ts'
import type { Injector, InjectValueOperation } from '../types/operations.ts'
import type { EmptyValue } from '../types/values.ts'
import getFromLocalStorage from './injectors/getFromLocalStorage/mod.ts'
import getFromQueryString from './injectors/getFromQueryString/mod.ts'
import getFromSessionStorage from './injectors/getFromSessionStorage/mod.ts'
import getFromState from './injectors/getFromState/mod.ts'
import getFromUrlParams from './injectors/getFromUrlParams/mod.ts'

// TODO: inject router and route
const useRouter = (): {
	location: Record<string, string>
	path: Array<string>
} => ({ location: {}, path: ['path'] })
const useRoute = (): { params: Record<string, string> } => ({ params: {} })

// TODO: how to inject store?

export default function makeMakeInjector() {
	return function injectValue(operation: InjectValueOperation): Injector {
		switch (operation.sourceType) {
			case TypeOfSource.STATE:
				return getFromState(operation)
			// case TypeOfSource.FETCH:
			// 	return getFromFetch(operation)
			case TypeOfSource.LOCAL_STORAGE:
				return getFromLocalStorage(operation)
			case TypeOfSource.SESSION_STORAGE:
				return getFromSessionStorage(operation)
			case TypeOfSource.QUERY_STRING:
				return getFromQueryString(operation, useRouter)
			case TypeOfSource.URL_PARAMS:
				return getFromUrlParams(operation, useRoute)
			// case TypeOfSource.COOKIE_STORAGE:
			// 	return getFromCookieStorage(operation)
			default:
				return () => ({} as EmptyValue)
		}
	}
}
