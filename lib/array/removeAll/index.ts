import filter from "../filter"

const removeAll =
	<T>(item: T) =>
	(arr: Array<T>) => {
		return filter(i => i !== item)(arr)
	}

export default removeAll
