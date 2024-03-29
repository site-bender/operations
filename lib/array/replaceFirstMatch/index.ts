import { isNone } from "../../fp/option"
import replaceAt from "../replaceAt"
import findIndex from "../findIndex"

type ReplaceFirstMatchF = (
	r: RegExp,
) => (f: (i: string) => string) => (arr: Array<string>) => Array<string>
const replaceFirstMatch: ReplaceFirstMatchF = r => f => arr => {
	const index = findIndex<string>(item => r.test(item))(arr)

	return isNone(index)
		? arr
		: replaceAt<string>((index as Some<number>).value)(f)(arr)
}

export default replaceFirstMatch
