import { TypeOfSource } from '../types/enums.js'
import { Injector, InjectValueOperation } from '../types/operations.js'
import { EmptyValue } from '../types/values.js'
import getFromLocalStorage from './injectors/getFromLocalStorage/mod.js'
import getFromQueryString from './injectors/getFromQueryString/mod.js'
import getFromSessionStorage from './injectors/getFromSessionStorage/mod.js'
import getFromState from './injectors/getFromState/mod.js'
import getFromUrlParams from './injectors/getFromUrlParams/mod.js'

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
