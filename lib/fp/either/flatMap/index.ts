import { isLeft } from ".."

type FlatMapF = <E, A, U>(
	f: (a: A) => Either<E, U>,
) => (e: Either<E, A>) => Either<E, U>

const flatMap: FlatMapF = f => e => (isLeft(e) ? e : f(e.right))

export default flatMap
