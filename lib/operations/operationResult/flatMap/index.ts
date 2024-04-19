import { isLeft } from "@sitebender/fp/lib/either"
import { OperationResult } from "../types"
import { isNone } from "@sitebender/fp/lib/option"

type FlatMap = <A, B>(
	f: (a: A) => OperationResult<B>,
) => (self: OperationResult<A>) => OperationResult<B>

const flatMap: FlatMap = f => self =>
	isLeft(self)
		? (self as any)
		: isNone(self.right)
			? (self as any)
			: f(self.right.value)

export default flatMap
