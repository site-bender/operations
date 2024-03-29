type TakeF = <T>(n: number) => (arr: Array<T>) => Array<T>
const take: TakeF = n => arr => arr.toSpliced(n)

export default take
