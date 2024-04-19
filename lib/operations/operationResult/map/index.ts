import { pipe } from "@sitebender/fp/lib/functions"
import { map as mapOption } from "@sitebender/fp/lib/option"
import { map as mapEither } from "@sitebender/fp/lib/either"
import { OperationResult } from "../types"

type Map = <A, B>(
	f: (a: A) => B,
) => (self: OperationResult<A>) => OperationResult<B>

const map: Map = f => self => pipe(self, mapEither(mapOption(f)))

export default map
