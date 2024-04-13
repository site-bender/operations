import { Option, fromNullable } from "@sitebender/fp/lib/option"

export type IndexOfF = <T>(t: T) => (arr: Array<T>) => Option<number>

const indexOf: IndexOfF = item => arr =>
	fromNullable(arr.indexOf(item) > -1 ? arr.indexOf(item) : undefined)

export default indexOf
