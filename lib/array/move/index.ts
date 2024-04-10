import { pipe } from "../../fp/functions"
import insertAt from "../insertAt"
import removeAt from "../removeAt"

export type MoveF = (i: number) => (j: number) => <T>(arr: Array<T>) => Array<T>

const move: MoveF = i => j => arr => {
	if (i >= 0 && i < arr.length && j >= 0 && j < arr.length) {
		const toMove = arr[i]

		return pipe(arr, removeAt(i)<(typeof arr)[0]>, insertAt(j)(toMove))
	}

	return arr
}

export default move
