type SliceFromF = <T>(i: number) => (len: number) => (arr: Array<T>) => Array<T>
const sliceFrom: SliceFromF = i => len => arr => arr.slice(i, i + len)

export default sliceFrom
