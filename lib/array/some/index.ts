export type SomeF = <T>(f: (i: T) => boolean) => (arr: Array<T>) => boolean
const some: SomeF = f => arr => Boolean(arr.filter(f).length)

export default some
