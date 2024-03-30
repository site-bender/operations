import { isNone } from "../../fp/option"
import replaceAt from "../replaceAt"
import findLastIndex from "../findLastIndex"

export type ReplaceLastMatchF = (
	re: RegExp,
) => (f: (i: string) => string) => (arr: Array<string>) => Array<string>
const replaceLastMatch: ReplaceLastMatchF = re => f => arr => {
	const index = findLastIndex<string>(item => new RegExp(re).test(item))(arr)

	return isNone(index)
		? arr
		: replaceAt<string>((index as Some<number>).value)(f)(arr)
}

export default replaceLastMatch
