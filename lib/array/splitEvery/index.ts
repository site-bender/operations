type SplitEveryF = <T>(n: number) => (arr: Array<T>) => Array<Array<T>>
const splitEvery: SplitEveryF = n => arr =>
	arr.length
		? [arr.slice(0, n), ...splitEvery<(typeof arr)[0]>(n)(arr.slice(n))]
		: []

export default splitEvery
