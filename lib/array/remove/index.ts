export type RemoveF = <T>(item: T) => (arr: Array<T>) => Array<T>

const remove: RemoveF = item => arr => {
	const index = arr.indexOf(item)

	return index === -1 ? arr : arr.slice(0, index).concat(arr.slice(index + 1))
}

export default remove
