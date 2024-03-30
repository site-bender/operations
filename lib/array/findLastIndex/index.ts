import { none, some } from "../../fp/option"

export type FindLastIndexF = <T>(
	f: (i: T) => boolean,
) => (arr: Array<T>) => Option<number>
const findLastIndex: FindLastIndexF = f => arr => {
	const index = arr.findLastIndex(f)

	return index === -1 ? none : some(index)
}

export default findLastIndex
