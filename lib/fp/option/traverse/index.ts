import { tail } from "../../../array"
import isNone from "../isNone"
import some from "../some"

type Traverse = <T, R>(
	f: (t: T) => Option<R>,
) => (self: Array<T>) => Option<Array<R>>

const traverse: Traverse = f => as => {
	if (as.length < 1) return some([])

	const o = f(as[0])

	if (isNone(o)) return o

	const out = [o.value]

	for (let a of tail(as)) {
		const o = f(a)

		if (isNone(o)) return o

		out.push(o.value)
	}

	return some(out)
}

export default traverse
