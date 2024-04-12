import not from "@sitebender/fp/lib/predicates/not"

export type OmitF = <T>(f: (i: T) => boolean) => (arr: Array<T>) => Array<T>
const omit: OmitF = f => arr => arr.filter(item => not(f(item)))

export default omit
