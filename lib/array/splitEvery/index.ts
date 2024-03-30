export type SplitEveryF = (n: number) => <T>(arr: Array<T>) => Array<Array<T>>
const splitEvery: SplitEveryF = n => arr =>
	arr.length && n > 0 ? [arr.slice(0, n), ...splitEvery(n)(arr.slice(n))] : []

export default splitEvery
