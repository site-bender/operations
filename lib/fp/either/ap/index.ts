import { pipe } from "../../functions"
import map from "../map"
import flatMap from "../flatMap"

type ApF = <E, A, B>(
	fab: Either<E, (a: A) => B>,
) => (e: Either<E, A>) => Either<E, B>

const ap: ApF = fab => e =>
	pipe(
		fab,
		flatMap(au => pipe(e, map(au))),
	)

export default ap
