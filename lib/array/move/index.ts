import insertAt from "../insertAt"
import removeAt from "../removeAt"

type MoveF = <T>(i: number) => (j: number) => (arr: Array<T>) => Array<T>
const move: MoveF = i => j => arr => {
	if (i < 0 || i > arr.length - 1 || j < 0 || j > arr.length) {
		return arr
	}

	const toMove = arr[i]

	return insertAt<(typeof arr)[0]>(j)(toMove)(removeAt<(typeof arr)[0]>(i)(arr))
}

export default move
