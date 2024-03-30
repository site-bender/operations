type TakeLastF = <T>(n: number) => (arr: Array<T>) => Array<T>
const takeLast: TakeLastF = n => arr => (n > 1 ? arr.slice(-n) : [])

export default takeLast
