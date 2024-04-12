import { Option, fromNullable } from "@sitebender/fp/lib/option"

export type FindF = <T>(f: (i: T) => boolean) => (arr: Array<T>) => Option<T>
const findLast: FindF = f => arr => fromNullable(arr.findLast(f))

export default findLast
