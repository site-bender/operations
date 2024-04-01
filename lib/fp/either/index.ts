import ap from "./apply"
import map from "./map"
import flatMap from "./flatMap"
import match from "./match"

const left = <E, A = never>(e: E): Either<E, A> => ({
	_tag: "Left",
	left: e,
})

const right = <A, E = never>(a: A): Either<E, A> => ({
	_tag: "Right",
	right: a,
})

const isLeft = <E, A>(x: Either<E, A>): x is Left<E> => x._tag === "Left"

const isRight = <A>(x: Either<any, A>): x is Right<A> => x._tag === "Right"

export { left, right, isLeft, isRight, ap, match, map, flatMap }
