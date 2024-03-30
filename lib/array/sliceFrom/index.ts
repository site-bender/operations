export type SliceFromF = (
	i: number,
) => (len: number) => <T>(arr: Array<T>) => Array<T>
const sliceFrom: SliceFromF = i => len => arr => arr.slice(i, i + len)

export default sliceFrom
