export const left = <E, A = never>(e: E): Either<E, A> => ({
	_tag: "Left",
	left: e,
})

export const right = <A, E = never>(a: A): Either<E, A> => ({
	_tag: "Right",
	right: a,
})

export const isLeft = <E, A>(x: Either<E, A>): x is Left<E> => x._tag === "Left"

type MapF = <E, A, U>(f: (a: A) => U) => (v: Either<E, A>) => Either<E, U>
export const map: MapF = f => v => (isLeft(v) ? v : right(f(v.right)))
