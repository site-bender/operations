import type { Arrays, Sets } from '../../../types/values.ts'
import ListFormat from 'https://cdn.skypack.dev/@formatjs/intl-listformat?dts'

const listFormatter = new ListFormat('en', {
	style: 'long',
	type: 'conjunction',
})

export default function setToString(
	set: Sets | Arrays | string,
	separator = ',',
): string | undefined {
	if (typeof set === 'string') {
		return listFormatter.format(set.split(separator))
	}

	if (Array.isArray(set)) {
		return listFormatter.format(set as Array<string>)
	}

	if (typeof set === 'object' && 'size' in set) {
		return listFormatter.format([...(set as Set<string>)])
	}

	return undefined
}
