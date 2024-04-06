export type ReduceF = <F extends ReduceFunction>(
	f: F,
) => (item: Parameters<F>[0]) => (arr: Array<Parameters<F>[1]>) => ReturnType<F>

const reduce: ReduceF = f => item => arr => arr.reduce(f, item)

export default reduce
