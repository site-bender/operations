import tail from "../../../array/tail"
import { right, isLeft } from "../index"

type Traverse = <E, A, B>(
	f: (a: A) => Either<E, B>,
) => (as: A[]) => Either<E, B[]>

const traverse: Traverse = f => as => {
	if (as.length < 1) return right([])

	const o = f(as[0])

	if (isLeft(o)) return o

	const out = [o.right]

	for (let a of tail(as)) {
		const o = f(a)

		if (isLeft(o)) return o

		out.push(o.right)
	}

	return right(out)
}

export default traverse
