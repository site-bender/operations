import not from "../../utilities/not"

type OmitF = <T>(f: (i: T) => boolean) => (arr: Array<T>) => Array<T>
const omit: OmitF = f => arr => arr.filter(item => not(f(item)))

export default omit
