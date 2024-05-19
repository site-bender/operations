import type { OperationResult } from "../types"

import pipe from "@sitebender/fp/lib/functions/pipe"
import { default as sequenceOption } from "@sitebender/fp/lib/option/sequence"
import map from "@sitebender/fp/lib/either/map"
import traverseAccumulate from "@sitebender/fp/lib/either/traverseAccumulate"

const sequence = <A>(rs: Array<OperationResult<A>>) => {
	return pipe(
		rs,
		pipe(
			(a: OperationResult<A>) => a,
			traverseAccumulate<string[]>((a, b) => [...a, ...b]),
		),
		map(sequenceOption),
	)
}

export default sequence
