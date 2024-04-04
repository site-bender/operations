import { pipe } from "../../functions"
import map from "../map"
import flatMap from "../flatMap"

type ApF = <E, A, U>(
	fau: Either<E, (a: A) => U>,
) => (e: Either<E, A>) => Either<E, U>

const ap: ApF = fau => e =>
	pipe(
		fau,
		flatMap(au => pipe(e, map(au))),
	)

export default ap
