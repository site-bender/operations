export type FirstF = <T>(arr: Array<T>) => Array<T>
const first: FirstF = arr => arr.slice(0, -1)

export default first
