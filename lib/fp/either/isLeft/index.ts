const isLeft = <E, A>(x: Either<E, A>): x is Left<E> => x._tag === "Left"

export default isLeft
