import { isNone } from "@sitebender/fp/lib/option"
import replaceAt from "../replaceAt"
import findIndex from "../findIndex"

export type ReplaceFirstMatchF = (
	re: RegExp,
) => (f: (i: string) => string) => (arr: Array<string>) => Array<string>

const replaceFirstMatch: ReplaceFirstMatchF = re => f => arr => {
	const index = findIndex<string>(item => re.test(item))(arr)

	return isNone(index) ? arr : replaceAt<string>(index.value)(f)(arr)
}

export default replaceFirstMatch
