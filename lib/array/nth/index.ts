import { fromNullable } from "../../fp/option"

type NthF = <T>(i: number) => (arr: Array<T>) => Option<T>
const nth: NthF = i => arr => fromNullable(arr.at(i))

export default nth
