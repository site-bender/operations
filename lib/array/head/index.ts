import { Option, fromNullable } from "@sitebender/fp/lib/option"

export type HeadF = <T>(arr: Array<T>) => Option<T>
const head: HeadF = arr => fromNullable(arr.at(0))

export default head
