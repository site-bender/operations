import not from "../../utilities/not"

export type NoneF = <T>(f: (i: T) => boolean) => (arr: Array<T>) => boolean
const none: NoneF = f => arr => not(arr.filter(f).length)

export default none
