import isNone from "../isNone"
import none from "../none"
import some from "../some"

type Traverse = <T, R>(f: (t: T) => R) => (self: Option<T>[]) => Option<R[]>

const traverse: Traverse = f => self => {
	const rs = []

	for (const option of self) {
		if (isNone(option)) return none
		rs.push(f(option.value))
	}

	return some(rs)
}

export default traverse
