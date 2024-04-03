import isNone from "../isNone"
import none from "../none"
import some from "../some"

type Traverse = <T, R>(
	f: (t: T) => R,
) => (self: Array<Option<T>>) => Option<Array<R>>

const traverse: Traverse = f => self => {
	const rs = []

	for (const option of self) {
		if (isNone(option)) return none
		rs.push(f(option.value))
	}

	return some(rs)
}

export default traverse
