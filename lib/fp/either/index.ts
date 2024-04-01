import { pipe } from "../functions"
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

type MapF = <E, A, U>(f: (a: A) => U) => (v: Either<E, A>) => Either<E, U>
const map: MapF = f => v => (isLeft(v) ? v : right(f(v.right)))

type FlatMapF = <E, A, U>(
	f: (a: A) => Either<E, U>,
) => (e: Either<E, A>) => Either<E, U>
const flatMap: FlatMapF = f => e => (isLeft(e) ? e : f(e.right))

type ApF = <E, A, U>(
	fau: Either<E, (a: A) => U>,
) => (e: Either<E, A>) => Either<E, U>
const ap: ApF = fau => e =>
	pipe(
		fau,
		flatMap(au => pipe(e, map(au))),
	)

export { left, right, isLeft, isRight, ap, match }
