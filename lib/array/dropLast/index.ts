type DropLastF = <T>(n: number) => (arr: Array<T>) => Array<T>
const dropLast: DropLastF = n => arr => arr.toSpliced(-n)

export default dropLast
