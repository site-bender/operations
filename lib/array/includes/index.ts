type IncludesF = <T>(t: T) => (arr: Array<T>) => boolean
const includes: IncludesF = item => arr => arr.includes(item)

export default includes
