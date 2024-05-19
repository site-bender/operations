import type { OperationResult } from "../types"
import type { Either } from "@sitebender/fp/lib/either/types"

import isLeft from "@sitebender/fp/lib/either/isLeft"
import isNone from "@sitebender/fp/lib/option/isNone"
import right from "@sitebender/fp/lib/either/right"
import some from "@sitebender/fp/lib/option/some"

type MapEither = <A, B>(
	f: (a: A) => Either<string[], B>,
) => (self: OperationResult<A>) => OperationResult<B>

const mapEither: MapEither = f => self => {
	if (isLeft(self)) return self as any
	if (isNone(self.right)) return self

	const r = f(self.right.value)
	if (isLeft(r)) return r
	return right(some(r.right))
}

export default mapEither
