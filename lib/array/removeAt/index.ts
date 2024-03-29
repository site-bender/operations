type RemoveAtF = <T>(i: number) => (arr: Array<T>) => Array<T>
const removeAt: RemoveAtF = i => arr => arr.slice(0, i).concat(arr.slice(i + 1))

export default removeAt
