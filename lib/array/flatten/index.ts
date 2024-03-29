type FlattenF = <T>(
	d?: number,
) => (
	arr: Array<T>,
) => FlatArray<
	T,
	| 0
	| 1
	| -1
	| 2
	| 3
	| 4
	| 5
	| 6
	| 7
	| 8
	| 9
	| 10
	| 11
	| 12
	| 13
	| 14
	| 15
	| 16
	| 17
	| 18
	| 19
	| 20
>[]
const flatten: FlattenF = d => arr => arr.flat(d)

export default flatten
