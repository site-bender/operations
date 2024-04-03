import { isLeft, right } from ".."

type MapF = <A, B, E>(f: (a: A) => B) => (e: Either<E, A>) => Either<E, B>

const map: MapF = f => e => (isLeft(e) ? e : right(f(e.right)))

export default map
