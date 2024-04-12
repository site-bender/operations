import { Option, fromNullable } from "@sitebender/fp/lib/option"

export type FindF = <T>(f: (i: T) => boolean) => (arr: Array<T>) => Option<T>
const find: FindF = f => arr => fromNullable(arr.find(f))

export default find
