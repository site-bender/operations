import { Either, isLeft, right } from "@sitebender/fp/lib/either"
import { OperationResult } from "../types"
import { some } from "@sitebender/fp/lib/option"

type FromEither = <A>(e: Either<string[], A>) => OperationResult<A>

const fromEither: FromEither = e =>
	isLeft(e) ? (e as any) : right(some(e.right))

export default fromEither
