export type ConcatF = <T>(a: Array<T>) => (b: Array<T>) => Array<T>

const concat: ConcatF =
	(a = []) =>
	(b = []) =>
		a.concat(b)

export default concat
