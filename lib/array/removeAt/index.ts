export type RemoveAtF = (count: number) => <T>(arr: Array<T>) => Array<T>

const removeAt: RemoveAtF = count => arr =>
	count >= 0 && count < arr.length
		? arr.slice(0, count).concat(arr.slice(count + 1))
		: arr.slice(0)

export default removeAt
