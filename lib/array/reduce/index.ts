type ReduceF = <T, U>(
	f: (acc: U, i: T) => U,
) => (init: U) => (arr: Array<T>) => U
const reduce: ReduceF = f => i => arr => arr.reduce(f, i)

export default reduce
