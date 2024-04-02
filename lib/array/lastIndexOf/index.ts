import { fromNullable } from "../../fp/option"

export type LastIndexOfF = <T>(t: T) => (arr: Array<T>) => Option<number>

const lastIndexOf: LastIndexOfF = item => arr =>
	fromNullable(arr.lastIndexOf(item) > -1 ? arr.lastIndexOf(item) : undefined)

export default lastIndexOf
