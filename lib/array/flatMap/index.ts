export type FlatMapF = <T, U>(
	f: (i: T) => U | Array<U>,
) => (arr: Array<T>) => Array<U>

const flatMap: FlatMapF = f => arr => arr.flatMap(f)

export default flatMap
