type SortF = <T>(f: (a: T, b: T) => number) => (arr: Array<T>) => Array<T>
const sort: SortF = f => arr => arr.sort(f)

export default sort
