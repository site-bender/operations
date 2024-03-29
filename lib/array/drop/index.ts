type DropF = <T>(n: number) => (arr: Array<T>) => Array<T>
const drop: DropF = n => arr => arr.slice(n)

export default drop
