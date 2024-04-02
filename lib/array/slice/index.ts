export type SliceF = (
	i: number,
) => (j: number) => <T>(arr: Array<T>) => Array<T>

const slice: SliceF = i => j => arr => arr.slice(i, j)

export default slice
