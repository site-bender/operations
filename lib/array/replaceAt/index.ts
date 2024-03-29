type ReplaceAtF = <T>(
	i: number,
) => (f: (item: T) => T) => (arr: Array<T>) => Array<T>
const replaceAt: ReplaceAtF = i => f => arr =>
	i >= arr.length
		? arr
		: arr
				.slice(0, i)
				.concat(f(arr[i]))
				.concat(arr.slice(i + 1))

export default replaceAt
