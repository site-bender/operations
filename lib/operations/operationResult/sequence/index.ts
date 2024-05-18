import { pipe } from "@sitebender/fp/lib/functions"
import { OperationResult } from "../types"
import { e, o } from "@sitebender/fp"

const sequence = <A>(rs: Array<OperationResult<A>>) => {
	return pipe(
		rs,
		pipe(
			(a: e.Either<string[], o.Option<A>>) => a,
			e.traverseAccumulate<string[]>((a, b) => [...a, ...b]),
		),
		e.map(o.sequence),
	)
}

export default sequence
