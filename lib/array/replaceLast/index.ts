import replaceAt from "../replaceAt"

type ReplaceLastF = <T>(
	item: T,
) => (f: (item: T) => T) => (arr: Array<T>) => Array<T>
const replaceLast: ReplaceLastF = item => f => arr =>
	replaceAt<typeof item>(arr.lastIndexOf(item))(f)(arr)

export default replaceLast
