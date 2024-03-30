import { fromNullable, none } from "../../fp/option"

type NthF = <T>(i: number) => (arr: Array<T>) => Option<T>
const nth: NthF = i => arr =>
	i >= 0 && i < arr.length ? fromNullable(arr.at(i)) : none

export default nth
