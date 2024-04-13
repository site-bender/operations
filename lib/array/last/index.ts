import { Option, fromNullable } from "@sitebender/fp/lib/option"

export type LastF = <T>(arr: Array<T>) => Option<T>
const last: LastF = arr => fromNullable(arr.at(-1))

export default last
