type TakeLastF = <T>(n: number) => (arr: Array<T>) => Array<T>
const takeLast: TakeLastF = n => arr => arr.slice(-n)

export default takeLast
