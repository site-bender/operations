type SplitEveryF = (n: number) => (str: string) => Array<string>
const splitEvery: SplitEveryF = n => str =>
	str.length ? [str.slice(0, n), ...splitEvery(n)(str.slice(n))] : []

export default splitEvery
