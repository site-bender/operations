import type { OperationResult } from "../types"

import pipe from "@sitebender/fp/lib/functions/pipe"
import { default as mapEither } from "@sitebender/fp/lib/either/map"
import { default as mapOption } from "@sitebender/fp/lib/option/map"

type Map = <A, B>(
	f: (a: A) => B,
) => (self: OperationResult<A>) => OperationResult<B>

const map: Map = f => self => pipe(self, mapEither(mapOption(f)))

export default map
