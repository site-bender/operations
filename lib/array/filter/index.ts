export type FilterF = <T>(f: (i: T) => boolean) => (arr: Array<T>) => Array<T>
const filter: FilterF = f => arr => arr.filter(f)

export default filter
