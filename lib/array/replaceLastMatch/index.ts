import { isNone } from "../../fp/option"
import replaceAt from "../replaceAt"
import findLastIndex from "../findIndex"

type ReplaceLastMatchF = (
	r: RegExp,
) => (f: (i: string) => string) => (arr: Array<string>) => Array<string>
const replaceLastMatch: ReplaceLastMatchF = r => f => arr => {
	const index = findLastIndex<string>(item => r.test(item))(arr)

	return isNone(index)
		? arr
		: replaceAt<string>((index as Some<number>).value)(f)(arr)
}

export default replaceLastMatch
