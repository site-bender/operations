import { isLeft, left, right } from ".."
import map from "../map"
import tail from "../../../array/tail"
import { pipe } from "../../functions"

type TraverseAccumulate = <E>(
	concat: (e: E, e2: E) => E,
) => <A, B>(f: (a: A) => Either<E, B>) => (as: A[]) => Either<E, B[]>

const traverseAccumulate: TraverseAccumulate = concat => f => as => {
	if (as.length < 1) return right([])

	const first = pipe(
		f(as[0]),
		map(_ => [_]),
	)
	const rest = tail(as)

	return rest.reduce((acc, val) => {
		const eitherB = f(val)

		if (isLeft(acc) && isLeft(eitherB))
			return left(concat(acc.left, eitherB.left))
		else if (isLeft(acc)) return acc
		else if (isLeft(eitherB)) return eitherB
		else return right([...acc.right, eitherB.right])
	}, first)
}

export default traverseAccumulate
