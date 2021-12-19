import { Arrays } from '../../../types/values.js'

export default function getArray(
	arr: Arrays | string,
	separator: string | RegExp = ',',
): Arrays {
	if (Array.isArray(arr)) {
		return arr
	}

	return typeof arr === 'string' ? arr.split(separator) : []
}
