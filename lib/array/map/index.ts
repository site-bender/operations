export type MapF = <T, U>(f: (i: T) => U) => (a: Array<T>) => Array<U>
const map: MapF = f => arr => arr.map(f)

export default map
