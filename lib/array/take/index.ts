type TakeF = <T>(n: number) => (arr: Array<T>) => Array<T>
const take: TakeF = n => arr => (n > 0 ? arr.toSpliced(n) : [])

export default take
