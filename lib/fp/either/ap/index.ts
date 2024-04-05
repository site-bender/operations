import { pipe } from "../../functions"
import map from "../map"
import flatMap from "../flatMap"

type ApF = <E, A, B>(
	eitherF: Either<E, (a: A) => B>,
) => (e: Either<E, A>) => Either<E, B>

const ap: ApF = eitherF => e =>
	pipe(
		eitherF,
		flatMap(f => pipe(e, map(f))),
	)

export default ap
