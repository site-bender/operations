import { Either, isLeft, right } from "@sitebender/fp/lib/either"
import { OperationResult } from "../types"
import { isNone, some } from "@sitebender/fp/lib/option"

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
