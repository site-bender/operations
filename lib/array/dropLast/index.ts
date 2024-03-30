export type DropLastF = (n: number) => <T>(arr: Array<T>) => Array<T>
const dropLast: DropLastF = n => arr =>
	n > 0 ? arr.toSpliced(-n) : arr.slice(0)

export default dropLast
