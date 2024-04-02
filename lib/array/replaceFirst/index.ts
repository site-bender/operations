import replaceAt from "../replaceAt"

export type ReplaceFirstF = <T>(
	item: T,
) => (f: (item: T) => T) => (arr: Array<T>) => Array<T>

const replaceFirst: ReplaceFirstF = item => f => arr =>
	replaceAt<typeof item>(arr.indexOf(item))(f)(arr)

export default replaceFirst
