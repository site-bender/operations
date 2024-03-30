import filter from "../filter"

export type RemoveAllF = <T>(item: T) => (arr: Array<T>) => Array<T>
const removeAll: RemoveAllF = item => arr => {
	return filter<(typeof arr)[0]>(i => i !== item)(arr)
}

export default removeAll
