export type DropF = (n: number) => <T>(arr: Array<T>) => Array<T>
const drop: DropF = n => arr => (n >= 0 ? arr.slice(n) : arr.slice(0))

export default drop
