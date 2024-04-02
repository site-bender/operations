export type ReplaceAllF = <T>(
	i: T,
) => (f: (item: T) => T) => (arr: Array<T>) => Array<T>

const replaceAll: ReplaceAllF = i => f => arr =>
	arr.map(item => (item === i ? f(item) : item))

export default replaceAll
