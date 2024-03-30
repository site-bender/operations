export type AllF = <T>(f: (i: T) => boolean) => (arr: Array<T>) => boolean
const all: AllF = f => arr => arr.every(f)

export default all
