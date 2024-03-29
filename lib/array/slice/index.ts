type SliceF = <T>(i: number) => (j: number) => (arr: Array<T>) => Array<T>
const slice: SliceF = i => j => arr => arr.slice(i, j)

export default slice
